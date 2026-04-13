import Common "common";

module {
  public type User = {
    id : Common.UserId;
    name : Text;
    mobile_number : Text;
    role : Common.Role;
    created_at : Common.Timestamp;
  };

  public type Session = {
    token : Common.Token;
    userId : Common.UserId;
  };

  public type OTPEntry = {
    mobile : Text;
    otp : Text;
    created_at : Common.Timestamp;
  };

  public type VerifyOTPResult = {
    token : Common.Token;
    userId : Common.UserId;
    role : Text;
    name : Text;
  };

  // Safe public projection of User — no mobile_number exposed to non-admins
  public type PublicUser = {
    id : Common.UserId;
    name : Text;
    role : Common.Role;
  };
};
