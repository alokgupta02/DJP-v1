class User {
  final String id;
  final String email;
  final String name;
  final String role;
  final int reputationScore;

  User({
    required this.id,
    required this.email,
    required this.name,
    required this.role,
    required this.reputationScore,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      name: json['name'] ?? 'Citizen',
      role: json['role'] ?? 'CITIZEN',
      reputationScore: json['reputationScore'] ?? 100,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'role': role,
      'reputationScore': reputationScore,
    };
  }
}
