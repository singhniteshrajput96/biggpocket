var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a;
import { P as ProtocolError, T as TimeoutWaitingForResponseErrorCode, p as utf8ToBytes, E as ExternalError, M as MissingRootKeyErrorCode, C as Certificate, q as lookupResultToBuffer, t as RequestStatusResponseStatus, w as UnknownError, x as RequestStatusDoneNoReplyErrorCode, y as RejectError, z as CertifiedRejectErrorCode, A as UNREACHABLE_ERROR, I as InputError, B as InvalidReadStateRequestErrorCode, D as ReadRequestType, G as Principal, J as IDL, K as MissingCanisterIdErrorCode, H as HttpAgent, L as encode, Q as QueryResponseStatus, N as UncertifiedRejectErrorCode, O as isV3ResponseBody, V as isV2ResponseBody, W as UncertifiedRejectUpdateErrorCode, Y as UnexpectedErrorCode, Z as decode, e as Subscribable, _ as pendingThenable, $ as resolveEnabled, f as shallowEqualObjects, a0 as resolveStaleTime, k as noop, a1 as environmentManager, a2 as isValidTimeout, a3 as timeUntilStale, a4 as timeoutManager, a5 as focusManager, a6 as fetchState, a7 as replaceData, n as notifyManager, r as reactExports, m as shouldThrowError, u as useQueryClient, a8 as useInternetIdentity, a9 as createActorWithConfig, aa as Record, ab as Variant, ac as Opt, ad as Vec, ae as Tuple, af as Service, ag as Func, ah as Text, ai as Nat, aj as Bool, ak as Int, al as Null, am as Float64 } from "./index-DmlGt2ze.js";
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a of strategies) {
      await a(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request));
  }
  return request;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b;
      options = {
        ...options,
        ...(_b = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal.from(effectiveCanisterId) : cid;
      const arg = encode(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
var QueryObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked == null ? void 0 : onPropTracked(key);
        if (key === "promise") {
          this.trackProp("data");
          if (!this.options.experimental_prefetchInRender && __privateGet(this, _currentThenable).status === "pending") {
            __privateGet(this, _currentThenable).reject(
              new Error(
                "experimental_prefetchInRender feature flag is not enabled"
              )
            );
          }
        }
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client).defaultQueryOptions(options);
    const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    var _a2;
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if ((prevResult == null ? void 0 : prevResult.isPlaceholderData) && options.placeholderData === (prevResultOptions == null ? void 0 : prevResultOptions.placeholderData)) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          (_a2 = __privateGet(this, _lastQueryWithDefinedData)) == null ? void 0 : _a2.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult == null ? void 0 : prevResult.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === (prevResultState == null ? void 0 : prevResultState.data) && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult == null ? void 0 : prevResult.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: query.isFetched(),
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable),
      isEnabled: resolveEnabled(options.enabled, query) !== false
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const hasResultData = nextResult.data !== void 0;
      const isErrorWithoutData = nextResult.status === "error" && !hasResultData;
      const finalizeThenableIfPossible = (thenable) => {
        if (isErrorWithoutData) {
          thenable.reject(nextResult.error);
        } else if (hasResultData) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (isErrorWithoutData || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (!isErrorWithoutData || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!(fetchOptions == null ? void 0 : fetchOptions.throwOnError)) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (environmentManager.isServer() || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout2 = time + 1;
  __privateSet(this, _staleTimeoutId, timeoutManager.setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout2));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (environmentManager.isServer() || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, timeoutManager.setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    timeoutManager.clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    timeoutManager.clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client).getQueryCache().build(__privateGet(this, _client), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery == null ? void 0 : prevQuery.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}
var IsRestoringContext = reactExports.createContext(false);
var useIsRestoring = () => reactExports.useContext(IsRestoringContext);
IsRestoringContext.Provider;
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = reactExports.createContext(createValue());
var useQueryErrorResetBoundary = () => reactExports.useContext(QueryErrorResetBoundaryContext);
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary, query) => {
  const throwOnError = (query == null ? void 0 : query.state.error) && typeof options.throwOnError === "function" ? shouldThrowError(options.throwOnError, [query.state.error, query]) : options.throwOnError;
  if (options.suspense || options.experimental_prefetchInRender || throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  reactExports.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const MIN_SUSPENSE_TIME_MS = 1e3;
    const clamp = (value) => value === "static" ? value : Math.max(value ?? MIN_SUSPENSE_TIME_MS, MIN_SUSPENSE_TIME_MS);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(
        defaultedOptions.gcTime,
        MIN_SUSPENSE_TIME_MS
      );
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => (defaultedOptions == null ? void 0 : defaultedOptions.suspense) && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});
function useBaseQuery(options, Observer, queryClient) {
  var _a2, _b, _c, _d;
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient();
  const defaultedOptions = client.defaultQueryOptions(options);
  (_b = (_a2 = client.getDefaultOptions().queries) == null ? void 0 : _a2._experimental_beforeQuery) == null ? void 0 : _b.call(
    _a2,
    defaultedOptions
  );
  const query = client.getQueryCache().get(defaultedOptions.queryHash);
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary, query);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = reactExports.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  reactExports.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query,
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  (_d = (_c = client.getDefaultOptions().queries) == null ? void 0 : _c._experimental_afterQuery) == null ? void 0 : _d.call(
    _c,
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !environmentManager.isServer() && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      query == null ? void 0 : query.promise
    );
    promise == null ? void 0 : promise.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver);
}
function hasAccessControl(actor) {
  return typeof actor === "object" && actor !== null && "_initializeAccessControl" in actor;
}
const ACTOR_QUERY_KEY = "actor";
function useActor(createActor2) {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const actorQuery = useQuery({
    queryKey: [ACTOR_QUERY_KEY, identity == null ? void 0 : identity.getPrincipal().toString()],
    queryFn: async () => {
      const isAuthenticated = !!identity;
      if (!isAuthenticated) {
        return await createActorWithConfig(createActor2);
      }
      const actorOptions = {
        agentOptions: {
          identity
        }
      };
      const actor = await createActorWithConfig(createActor2, actorOptions);
      if (hasAccessControl(actor)) {
        await actor._initializeAccessControl();
      }
      return actor;
    },
    // Only refetch when identity changes
    staleTime: Number.POSITIVE_INFINITY,
    // This will cause the actor to be recreated when the identity changes
    enabled: true
  });
  reactExports.useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_QUERY_KEY);
        }
      });
    }
  }, [actorQuery.data, queryClient]);
  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching
  };
}
const UploadDocumentInput = Record({
  "loan_id": Nat,
  "file_name": Text,
  "file_url": Text,
  "file_size": Nat
});
const Timestamp = Int;
const Document = Record({
  "id": Nat,
  "loan_id": Nat,
  "file_name": Text,
  "file_url": Text,
  "file_size": Nat,
  "uploaded_at": Timestamp,
  "uploaded_by": Nat
});
const UserId = Nat;
const Role = Variant({ "admin": Null, "user": Null });
const PublicUser = Record({
  "id": UserId,
  "name": Text,
  "role": Role
});
const LoanApplication = Record({
  "id": Nat,
  "co_applicant_name": Text,
  "bank_name": Text,
  "updated_at": Timestamp,
  "current_stage": Nat,
  "is_rejected": Bool,
  "employment_type": Text,
  "created_at": Timestamp,
  "user_id": Opt(UserId),
  "loan_amount": Nat,
  "loan_type": Text,
  "income": Nat,
  "rejection_stage": Nat,
  "property_value": Nat,
  "distribution_partner": Text,
  "property_type": Text,
  "is_active": Bool,
  "rejection_reason": Text,
  "applicant_name": Text
});
const LoanStageHistory = Record({
  "id": Nat,
  "loan_id": Nat,
  "stage_index": Nat,
  "show_remarks_to_user": Bool,
  "timestamp": Timestamp,
  "updated_by_admin_id": Nat,
  "stage_name": Text,
  "remarks": Text
});
const LoanWithHistory = Record({
  "loan": LoanApplication,
  "history": Vec(LoanStageHistory),
  "assigned_user_ids": Vec(Nat)
});
const PaginatedLoans = Record({
  "total": Nat,
  "page": Nat,
  "pageSize": Nat,
  "loans": Vec(LoanWithHistory)
});
const DashboardStats = Record({
  "total_loans": Nat,
  "sanctioned_count": Nat,
  "rejected_loans": Nat,
  "stage_breakdown": Vec(Tuple(Nat, Text, Nat)),
  "disbursement_percent": Float64,
  "active_loans": Nat,
  "recent_activity": Vec(LoanStageHistory),
  "sanctioned_percent": Float64,
  "dropoff_rate": Float64,
  "disbursed_count": Nat
});
const Token = Text;
Service({
  "adminAddDocument": Func(
    [Text, UploadDocumentInput],
    [Variant({ "ok": Document, "err": Text })],
    []
  ),
  "adminAddUserToLoan": Func(
    [Text, Nat, Nat],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminAssignMultipleUsers": Func(
    [Text, Nat, Vec(Nat)],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminAssignUser": Func(
    [Text, Nat, Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminCreateLoan": Func(
    [
      Text,
      Text,
      Text,
      Text,
      Nat,
      Text,
      Text,
      Text,
      Text,
      Nat,
      Text,
      Nat
    ],
    [Variant({ "ok": Nat, "err": Text })],
    []
  ),
  "adminCreateUser": Func(
    [Text, Text, Text, Text],
    [Variant({ "ok": PublicUser, "err": Text })],
    []
  ),
  "adminDeleteDocument": Func(
    [Text, Nat],
    [Variant({ "ok": Bool, "err": Text })],
    []
  ),
  "adminDeleteLoan": Func(
    [Text, Nat],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminGetAllLoans": Func(
    [
      Text,
      Nat,
      Nat,
      Text,
      Opt(Nat),
      Opt(Nat)
    ],
    [Variant({ "ok": PaginatedLoans, "err": Text })],
    []
  ),
  "adminGetAllUsers": Func(
    [Text],
    [Variant({ "ok": Vec(PublicUser), "err": Text })],
    []
  ),
  "adminGetDashboardStats": Func(
    [Text],
    [Variant({ "ok": DashboardStats, "err": Text })],
    []
  ),
  "adminGetLoanDocuments": Func(
    [Text, Nat],
    [Variant({ "ok": Vec(Document), "err": Text })],
    []
  ),
  "adminGetUserById": Func(
    [Text, Nat],
    [Variant({ "ok": Opt(PublicUser), "err": Text })],
    []
  ),
  "adminRejectLoan": Func(
    [Text, Nat, Text],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminRemoveUserFromLoan": Func(
    [Text, Nat, Nat],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminUnrejectLoan": Func(
    [Text, Nat],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminUpdateAdminMobile": Func(
    [Text, Text],
    [Variant({ "ok": Text, "err": Text })],
    []
  ),
  "adminUpdateLoan": Func(
    [Text, Nat, Text, Text, Text, Nat],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "adminUpdateStage": Func(
    [Text, Nat, Nat, Text, Bool],
    [Variant({ "ok": Null, "err": Text })],
    []
  ),
  "getLoanById": Func(
    [Text, Nat],
    [Variant({ "ok": LoanWithHistory, "err": Text })],
    []
  ),
  "getLoanDocuments": Func(
    [Text, Nat],
    [Variant({ "ok": Vec(Document), "err": Text })],
    []
  ),
  "getMyLoans": Func(
    [Text],
    [Variant({ "ok": Vec(LoanWithHistory), "err": Text })],
    []
  ),
  "sendOTP": Func([Text], [Text], []),
  "verifyOTP": Func(
    [Text, Text],
    [
      Variant({
        "ok": Record({
          "token": Token,
          "userId": UserId,
          "name": Text,
          "role": Text
        }),
        "err": Text
      })
    ],
    []
  )
});
const idlFactory = ({ IDL: IDL2 }) => {
  const UploadDocumentInput2 = IDL2.Record({
    "loan_id": IDL2.Nat,
    "file_name": IDL2.Text,
    "file_url": IDL2.Text,
    "file_size": IDL2.Nat
  });
  const Timestamp2 = IDL2.Int;
  const Document2 = IDL2.Record({
    "id": IDL2.Nat,
    "loan_id": IDL2.Nat,
    "file_name": IDL2.Text,
    "file_url": IDL2.Text,
    "file_size": IDL2.Nat,
    "uploaded_at": Timestamp2,
    "uploaded_by": IDL2.Nat
  });
  const UserId2 = IDL2.Nat;
  const Role2 = IDL2.Variant({ "admin": IDL2.Null, "user": IDL2.Null });
  const PublicUser2 = IDL2.Record({
    "id": UserId2,
    "name": IDL2.Text,
    "role": Role2
  });
  const LoanApplication2 = IDL2.Record({
    "id": IDL2.Nat,
    "co_applicant_name": IDL2.Text,
    "bank_name": IDL2.Text,
    "updated_at": Timestamp2,
    "current_stage": IDL2.Nat,
    "is_rejected": IDL2.Bool,
    "employment_type": IDL2.Text,
    "created_at": Timestamp2,
    "user_id": IDL2.Opt(UserId2),
    "loan_amount": IDL2.Nat,
    "loan_type": IDL2.Text,
    "income": IDL2.Nat,
    "rejection_stage": IDL2.Nat,
    "property_value": IDL2.Nat,
    "distribution_partner": IDL2.Text,
    "property_type": IDL2.Text,
    "is_active": IDL2.Bool,
    "rejection_reason": IDL2.Text,
    "applicant_name": IDL2.Text
  });
  const LoanStageHistory2 = IDL2.Record({
    "id": IDL2.Nat,
    "loan_id": IDL2.Nat,
    "stage_index": IDL2.Nat,
    "show_remarks_to_user": IDL2.Bool,
    "timestamp": Timestamp2,
    "updated_by_admin_id": IDL2.Nat,
    "stage_name": IDL2.Text,
    "remarks": IDL2.Text
  });
  const LoanWithHistory2 = IDL2.Record({
    "loan": LoanApplication2,
    "history": IDL2.Vec(LoanStageHistory2),
    "assigned_user_ids": IDL2.Vec(IDL2.Nat)
  });
  const PaginatedLoans2 = IDL2.Record({
    "total": IDL2.Nat,
    "page": IDL2.Nat,
    "pageSize": IDL2.Nat,
    "loans": IDL2.Vec(LoanWithHistory2)
  });
  const DashboardStats2 = IDL2.Record({
    "total_loans": IDL2.Nat,
    "sanctioned_count": IDL2.Nat,
    "rejected_loans": IDL2.Nat,
    "stage_breakdown": IDL2.Vec(IDL2.Tuple(IDL2.Nat, IDL2.Text, IDL2.Nat)),
    "disbursement_percent": IDL2.Float64,
    "active_loans": IDL2.Nat,
    "recent_activity": IDL2.Vec(LoanStageHistory2),
    "sanctioned_percent": IDL2.Float64,
    "dropoff_rate": IDL2.Float64,
    "disbursed_count": IDL2.Nat
  });
  const Token2 = IDL2.Text;
  return IDL2.Service({
    "adminAddDocument": IDL2.Func(
      [IDL2.Text, UploadDocumentInput2],
      [IDL2.Variant({ "ok": Document2, "err": IDL2.Text })],
      []
    ),
    "adminAddUserToLoan": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "adminAssignMultipleUsers": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Vec(IDL2.Nat)],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "adminAssignUser": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "adminCreateLoan": IDL2.Func(
      [
        IDL2.Text,
        IDL2.Text,
        IDL2.Text,
        IDL2.Text,
        IDL2.Nat,
        IDL2.Text,
        IDL2.Text,
        IDL2.Text,
        IDL2.Text,
        IDL2.Nat,
        IDL2.Text,
        IDL2.Nat
      ],
      [IDL2.Variant({ "ok": IDL2.Nat, "err": IDL2.Text })],
      []
    ),
    "adminCreateUser": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text],
      [IDL2.Variant({ "ok": PublicUser2, "err": IDL2.Text })],
      []
    ),
    "adminDeleteDocument": IDL2.Func(
      [IDL2.Text, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Bool, "err": IDL2.Text })],
      []
    ),
    "adminDeleteLoan": IDL2.Func(
      [IDL2.Text, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "adminGetAllLoans": IDL2.Func(
      [
        IDL2.Text,
        IDL2.Nat,
        IDL2.Nat,
        IDL2.Text,
        IDL2.Opt(IDL2.Nat),
        IDL2.Opt(IDL2.Nat)
      ],
      [IDL2.Variant({ "ok": PaginatedLoans2, "err": IDL2.Text })],
      []
    ),
    "adminGetAllUsers": IDL2.Func(
      [IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Vec(PublicUser2), "err": IDL2.Text })],
      []
    ),
    "adminGetDashboardStats": IDL2.Func(
      [IDL2.Text],
      [IDL2.Variant({ "ok": DashboardStats2, "err": IDL2.Text })],
      []
    ),
    "adminGetLoanDocuments": IDL2.Func(
      [IDL2.Text, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Vec(Document2), "err": IDL2.Text })],
      []
    ),
    "adminGetUserById": IDL2.Func(
      [IDL2.Text, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Opt(PublicUser2), "err": IDL2.Text })],
      []
    ),
    "adminRejectLoan": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "adminRemoveUserFromLoan": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "adminUnrejectLoan": IDL2.Func(
      [IDL2.Text, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "adminUpdateAdminMobile": IDL2.Func(
      [IDL2.Text, IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Text, "err": IDL2.Text })],
      []
    ),
    "adminUpdateLoan": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "adminUpdateStage": IDL2.Func(
      [IDL2.Text, IDL2.Nat, IDL2.Nat, IDL2.Text, IDL2.Bool],
      [IDL2.Variant({ "ok": IDL2.Null, "err": IDL2.Text })],
      []
    ),
    "getLoanById": IDL2.Func(
      [IDL2.Text, IDL2.Nat],
      [IDL2.Variant({ "ok": LoanWithHistory2, "err": IDL2.Text })],
      []
    ),
    "getLoanDocuments": IDL2.Func(
      [IDL2.Text, IDL2.Nat],
      [IDL2.Variant({ "ok": IDL2.Vec(Document2), "err": IDL2.Text })],
      []
    ),
    "getMyLoans": IDL2.Func(
      [IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Vec(LoanWithHistory2), "err": IDL2.Text })],
      []
    ),
    "sendOTP": IDL2.Func([IDL2.Text], [IDL2.Text], []),
    "verifyOTP": IDL2.Func(
      [IDL2.Text, IDL2.Text],
      [
        IDL2.Variant({
          "ok": IDL2.Record({
            "token": Token2,
            "userId": UserId2,
            "name": IDL2.Text,
            "role": IDL2.Text
          }),
          "err": IDL2.Text
        })
      ],
      []
    )
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async adminAddDocument(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminAddDocument(arg0, arg1);
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminAddDocument(arg0, arg1);
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminAddUserToLoan(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.adminAddUserToLoan(arg0, arg1, arg2);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminAddUserToLoan(arg0, arg1, arg2);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminAssignMultipleUsers(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.adminAssignMultipleUsers(arg0, arg1, arg2);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminAssignMultipleUsers(arg0, arg1, arg2);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminAssignUser(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.adminAssignUser(arg0, arg1, arg2);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminAssignUser(arg0, arg1, arg2);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminCreateLoan(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11) {
    if (this.processError) {
      try {
        const result = await this.actor.adminCreateLoan(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11);
        return from_candid_variant_n3(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminCreateLoan(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11);
      return from_candid_variant_n3(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminCreateUser(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.adminCreateUser(arg0, arg1, arg2, arg3);
        return from_candid_variant_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminCreateUser(arg0, arg1, arg2, arg3);
      return from_candid_variant_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminDeleteDocument(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteDocument(arg0, arg1);
        return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteDocument(arg0, arg1);
      return from_candid_variant_n9(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminDeleteLoan(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminDeleteLoan(arg0, arg1);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminDeleteLoan(arg0, arg1);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminGetAllLoans(arg0, arg1, arg2, arg3, arg4, arg5) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetAllLoans(arg0, arg1, arg2, arg3, to_candid_opt_n10(this._uploadFile, this._downloadFile, arg4), to_candid_opt_n10(this._uploadFile, this._downloadFile, arg5));
        return from_candid_variant_n11(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetAllLoans(arg0, arg1, arg2, arg3, to_candid_opt_n10(this._uploadFile, this._downloadFile, arg4), to_candid_opt_n10(this._uploadFile, this._downloadFile, arg5));
      return from_candid_variant_n11(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminGetAllUsers(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetAllUsers(arg0);
        return from_candid_variant_n20(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetAllUsers(arg0);
      return from_candid_variant_n20(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminGetDashboardStats(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetDashboardStats(arg0);
        return from_candid_variant_n22(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetDashboardStats(arg0);
      return from_candid_variant_n22(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminGetLoanDocuments(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetLoanDocuments(arg0, arg1);
        return from_candid_variant_n23(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetLoanDocuments(arg0, arg1);
      return from_candid_variant_n23(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminGetUserById(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminGetUserById(arg0, arg1);
        return from_candid_variant_n24(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminGetUserById(arg0, arg1);
      return from_candid_variant_n24(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminRejectLoan(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.adminRejectLoan(arg0, arg1, arg2);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminRejectLoan(arg0, arg1, arg2);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminRemoveUserFromLoan(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.adminRemoveUserFromLoan(arg0, arg1, arg2);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminRemoveUserFromLoan(arg0, arg1, arg2);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUnrejectLoan(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUnrejectLoan(arg0, arg1);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUnrejectLoan(arg0, arg1);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateAdminMobile(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateAdminMobile(arg0, arg1);
        return from_candid_variant_n26(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateAdminMobile(arg0, arg1);
      return from_candid_variant_n26(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateLoan(arg0, arg1, arg2, arg3, arg4, arg5) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateLoan(arg0, arg1, arg2, arg3, arg4, arg5);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateLoan(arg0, arg1, arg2, arg3, arg4, arg5);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async adminUpdateStage(arg0, arg1, arg2, arg3, arg4) {
    if (this.processError) {
      try {
        const result = await this.actor.adminUpdateStage(arg0, arg1, arg2, arg3, arg4);
        return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.adminUpdateStage(arg0, arg1, arg2, arg3, arg4);
      return from_candid_variant_n2(this._uploadFile, this._downloadFile, result);
    }
  }
  async getLoanById(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.getLoanById(arg0, arg1);
        return from_candid_variant_n27(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLoanById(arg0, arg1);
      return from_candid_variant_n27(this._uploadFile, this._downloadFile, result);
    }
  }
  async getLoanDocuments(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.getLoanDocuments(arg0, arg1);
        return from_candid_variant_n23(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getLoanDocuments(arg0, arg1);
      return from_candid_variant_n23(this._uploadFile, this._downloadFile, result);
    }
  }
  async getMyLoans(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getMyLoans(arg0);
        return from_candid_variant_n28(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getMyLoans(arg0);
      return from_candid_variant_n28(this._uploadFile, this._downloadFile, result);
    }
  }
  async sendOTP(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.sendOTP(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.sendOTP(arg0);
      return result;
    }
  }
  async verifyOTP(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.verifyOTP(arg0, arg1);
        return from_candid_variant_n29(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.verifyOTP(arg0, arg1);
      return from_candid_variant_n29(this._uploadFile, this._downloadFile, result);
    }
  }
}
function from_candid_LoanApplication_n17(_uploadFile, _downloadFile, value) {
  return from_candid_record_n18(_uploadFile, _downloadFile, value);
}
function from_candid_LoanWithHistory_n15(_uploadFile, _downloadFile, value) {
  return from_candid_record_n16(_uploadFile, _downloadFile, value);
}
function from_candid_PaginatedLoans_n12(_uploadFile, _downloadFile, value) {
  return from_candid_record_n13(_uploadFile, _downloadFile, value);
}
function from_candid_PublicUser_n5(_uploadFile, _downloadFile, value) {
  return from_candid_record_n6(_uploadFile, _downloadFile, value);
}
function from_candid_Role_n7(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n8(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n19(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n25(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_PublicUser_n5(_uploadFile, _downloadFile, value[0]);
}
function from_candid_record_n13(_uploadFile, _downloadFile, value) {
  return {
    total: value.total,
    page: value.page,
    pageSize: value.pageSize,
    loans: from_candid_vec_n14(_uploadFile, _downloadFile, value.loans)
  };
}
function from_candid_record_n16(_uploadFile, _downloadFile, value) {
  return {
    loan: from_candid_LoanApplication_n17(_uploadFile, _downloadFile, value.loan),
    history: value.history,
    assigned_user_ids: value.assigned_user_ids
  };
}
function from_candid_record_n18(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    co_applicant_name: value.co_applicant_name,
    bank_name: value.bank_name,
    updated_at: value.updated_at,
    current_stage: value.current_stage,
    is_rejected: value.is_rejected,
    employment_type: value.employment_type,
    created_at: value.created_at,
    user_id: record_opt_to_undefined(from_candid_opt_n19(_uploadFile, _downloadFile, value.user_id)),
    loan_amount: value.loan_amount,
    loan_type: value.loan_type,
    income: value.income,
    rejection_stage: value.rejection_stage,
    property_value: value.property_value,
    distribution_partner: value.distribution_partner,
    property_type: value.property_type,
    is_active: value.is_active,
    rejection_reason: value.rejection_reason,
    applicant_name: value.applicant_name
  };
}
function from_candid_record_n6(_uploadFile, _downloadFile, value) {
  return {
    id: value.id,
    name: value.name,
    role: from_candid_Role_n7(_uploadFile, _downloadFile, value.role)
  };
}
function from_candid_variant_n1(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n11(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_PaginatedLoans_n12(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n2(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n20(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_vec_n21(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n22(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n23(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n24(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_opt_n25(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n26(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n27(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_LoanWithHistory_n15(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n28(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_vec_n14(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n29(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n3(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n4(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: from_candid_PublicUser_n5(_uploadFile, _downloadFile, value.ok)
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_variant_n8(_uploadFile, _downloadFile, value) {
  return "admin" in value ? "admin" : "user" in value ? "user" : value;
}
function from_candid_variant_n9(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_vec_n14(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_LoanWithHistory_n15(_uploadFile, _downloadFile, x));
}
function from_candid_vec_n21(_uploadFile, _downloadFile, value) {
  return value.map((x) => from_candid_PublicUser_n5(_uploadFile, _downloadFile, x));
}
function to_candid_opt_n10(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
function mapStageHistory(h) {
  return {
    id: Number(h.id),
    loanId: Number(h.loan_id),
    stageIndex: Number(h.stage_index),
    stageName: h.stage_name,
    remarks: h.remarks,
    showRemarksToUser: h.show_remarks_to_user,
    timestamp: Number(h.timestamp),
    updatedByAdminId: Number(h.updated_by_admin_id)
  };
}
function mapLoan(l) {
  return {
    id: Number(l.id),
    applicantName: l.applicant_name,
    bankName: l.bank_name,
    loanType: l.loan_type,
    loanAmount: Number(l.loan_amount),
    currentStage: Number(l.current_stage),
    isActive: l.is_active,
    userId: l.user_id !== void 0 ? Number(l.user_id) : void 0,
    createdAt: Number(l.created_at),
    updatedAt: Number(l.updated_at),
    distributionPartner: l.distribution_partner || void 0,
    coApplicantName: l.co_applicant_name || void 0,
    employmentType: l.employment_type || void 0,
    income: Number(l.income) || void 0,
    propertyType: l.property_type || void 0,
    propertyValue: Number(l.property_value) || void 0,
    isRejected: l.is_rejected,
    rejectionReason: l.rejection_reason || void 0,
    rejectionStage: Number(l.rejection_stage) || void 0
  };
}
function mapLoanWithHistory(lh) {
  return {
    loan: mapLoan(lh.loan),
    history: lh.history.map(mapStageHistory),
    assignedUserIds: lh.assigned_user_ids.map(Number)
  };
}
function mapPaginatedLoans(pl) {
  return {
    total: Number(pl.total),
    page: Number(pl.page),
    pageSize: Number(pl.pageSize),
    loans: pl.loans.map(mapLoanWithHistory)
  };
}
function mapDashboardStats(stats) {
  return {
    totalLoans: Number(stats.total_loans),
    activeLoans: Number(stats.active_loans),
    disbursedCount: Number(stats.disbursed_count),
    sanctionedCount: Number(stats.sanctioned_count),
    rejectedLoans: Number(stats.rejected_loans),
    stageBreakdown: stats.stage_breakdown.map(([idx, name, count]) => ({
      stageIndex: Number(idx),
      stageName: name,
      count: Number(count)
    })),
    sanctionedPercent: stats.sanctioned_percent,
    disbursementPercent: stats.disbursement_percent,
    dropoffRate: stats.dropoff_rate,
    recentActivity: stats.recent_activity.map(mapStageHistory)
  };
}
function mapDocument(d) {
  return {
    id: Number(d.id),
    loan_id: Number(d.loan_id),
    file_url: d.file_url,
    file_name: d.file_name,
    file_size: Number(d.file_size),
    uploaded_by: Number(d.uploaded_by),
    uploaded_at: Number(d.uploaded_at)
  };
}
function mapPublicUser(u) {
  return {
    id: Number(u.id),
    name: u.name,
    role: u.role
  };
}
async function sendOTP(actor, mobile) {
  return actor.sendOTP(mobile);
}
async function verifyOTP(actor, mobile, otp) {
  const result = await actor.verifyOTP(mobile, otp);
  if (result.__kind__ === "err") throw new Error(result.err);
  const { token, userId, name, role } = result.ok;
  return {
    token,
    userId: Number(userId),
    name,
    role: role === "admin" ? "admin" : "user"
  };
}
async function getMyLoans(actor, token) {
  const result = await actor.getMyLoans(token);
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok.map(mapLoanWithHistory);
}
async function getLoanById(actor, token, loanId) {
  const result = await actor.getLoanById(token, BigInt(loanId));
  if (result.__kind__ === "err") throw new Error(result.err);
  return mapLoanWithHistory(result.ok);
}
async function adminCreateLoan(actor, token, applicantName, bankName, loanType, loanAmount, mobile, distributionPartner = "", coApplicantName = "", employmentType = "", income = 0, propertyType = "", propertyValue = 0) {
  const result = await actor.adminCreateLoan(
    token,
    applicantName,
    bankName,
    loanType,
    BigInt(loanAmount),
    mobile,
    distributionPartner,
    coApplicantName,
    employmentType,
    BigInt(income),
    propertyType,
    BigInt(propertyValue)
  );
  if (result.__kind__ === "err") throw new Error(result.err);
  return Number(result.ok);
}
async function adminUpdateStage(actor, token, loanId, stageIndex, remarks, showRemarks) {
  const result = await actor.adminUpdateStage(
    token,
    BigInt(loanId),
    BigInt(stageIndex),
    remarks,
    showRemarks
  );
  if (result.__kind__ === "err") throw new Error(result.err);
}
async function adminGetAllLoans(actor, token, page, pageSize, search, stageFilter, assignedUserFilter = null) {
  const result = await actor.adminGetAllLoans(
    token,
    BigInt(page),
    BigInt(pageSize),
    search,
    stageFilter !== null ? BigInt(stageFilter) : null,
    assignedUserFilter !== null ? BigInt(assignedUserFilter) : null
  );
  if (result.__kind__ === "err") throw new Error(result.err);
  return mapPaginatedLoans(result.ok);
}
async function adminDeleteLoan(actor, token, loanId) {
  const result = await actor.adminDeleteLoan(token, BigInt(loanId));
  if (result.__kind__ === "err") throw new Error(result.err);
}
async function adminGetDashboardStats(actor, token) {
  const result = await actor.adminGetDashboardStats(token);
  if (result.__kind__ === "err") throw new Error(result.err);
  return mapDashboardStats(result.ok);
}
async function adminUpdateLoan(actor, token, loanId, applicantName, bankName, loanType, loanAmount) {
  const result = await actor.adminUpdateLoan(
    token,
    BigInt(loanId),
    applicantName,
    bankName,
    loanType,
    BigInt(loanAmount)
  );
  if (result.__kind__ === "err") throw new Error(result.err);
}
async function adminCreateUser(actor, token, name, mobile, role) {
  const result = await actor.adminCreateUser(token, name, mobile, role);
  if (result.__kind__ === "err") throw new Error(result.err);
  return {
    id: Number(result.ok.id),
    name: result.ok.name,
    role: result.ok.role
  };
}
async function adminGetAllUsers(actor, token) {
  const result = await actor.adminGetAllUsers(token);
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok.map(mapPublicUser);
}
async function adminUpdateAdminMobile(actor, token, newMobile) {
  const result = await actor.adminUpdateAdminMobile(token, newMobile);
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}
async function adminAddUserToLoan(actor, token, loan_id, user_id) {
  const result = await actor.adminAddUserToLoan(
    token,
    BigInt(loan_id),
    BigInt(user_id)
  );
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}
async function adminRemoveUserFromLoan(actor, token, loan_id, user_id) {
  const result = await actor.adminRemoveUserFromLoan(
    token,
    BigInt(loan_id),
    BigInt(user_id)
  );
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}
async function adminGetLoanDocuments(actor, token, loan_id) {
  const result = await actor.adminGetLoanDocuments(token, BigInt(loan_id));
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok.map(mapDocument);
}
async function getLoanDocuments(actor, token, loan_id) {
  const result = await actor.getLoanDocuments(token, BigInt(loan_id));
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok.map(mapDocument);
}
async function adminAddDocument(actor, token, input) {
  const beInput = {
    loan_id: BigInt(input.loan_id),
    file_url: input.file_url,
    file_name: input.file_name,
    file_size: BigInt(input.file_size)
  };
  const result = await actor.adminAddDocument(token, beInput);
  if (result.__kind__ === "err") throw new Error(result.err);
  return mapDocument(result.ok);
}
async function adminDeleteDocument(actor, token, doc_id) {
  const result = await actor.adminDeleteDocument(token, BigInt(doc_id));
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}
async function adminRejectLoan(actor, token, loan_id, reason) {
  const result = await actor.adminRejectLoan(token, BigInt(loan_id), reason);
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}
async function adminUnrejectLoan(actor, token, loan_id) {
  const result = await actor.adminUnrejectLoan(token, BigInt(loan_id));
  if (result.__kind__ === "err") return { ok: false, err: result.err };
  return { ok: true };
}
export {
  useQuery as a,
  adminCreateLoan as b,
  createActor as c,
  adminUpdateLoan as d,
  adminAddDocument as e,
  adminDeleteDocument as f,
  getLoanById as g,
  adminRemoveUserFromLoan as h,
  adminUpdateStage as i,
  adminUnrejectLoan as j,
  adminAddUserToLoan as k,
  adminRejectLoan as l,
  adminDeleteLoan as m,
  adminCreateUser as n,
  adminUpdateAdminMobile as o,
  getMyLoans as p,
  adminGetAllLoans as q,
  adminGetDashboardStats as r,
  sendOTP as s,
  adminGetAllUsers as t,
  useActor as u,
  verifyOTP as v,
  adminGetLoanDocuments as w,
  getLoanDocuments as x
};
