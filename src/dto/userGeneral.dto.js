export default class UserGeneralDTO {
    constructor(user) {
    this.fullName = `${user.first_name} ${user.last_name}`
    this.email = user.email
    this.role = user.role;
    
  }
  static mapToGeneralDTO(user) {
    return {
      fullName: `${user.first_name ?? ''} ${user.last_name ?? ''}`,
      email: user.email ?? '',
      role: user.role ?? '',
      id: user._id,
    };
  }
}