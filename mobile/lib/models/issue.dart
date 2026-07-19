class Issue {
  final String? id;
  final String title;
  final String description;
  final String category;
  final String priority;
  final String status;
  final String? location;
  final int supportsCount;
  final int commentsCount;
  final String? authorId;

  Issue({
    this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.priority,
    required this.status,
    this.location,
    this.supportsCount = 0,
    this.commentsCount = 0,
    this.authorId,
  });

  factory Issue.fromJson(Map<String, dynamic> json) {
    return Issue(
      id: json['id'],
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      category: json['category'] ?? 'INFRASTRUCTURE',
      priority: json['priority'] ?? 'MEDIUM',
      status: json['status'] ?? 'OPEN',
      location: json['location'],
      supportsCount: json['supportsCount'] ?? 0,
      commentsCount: json['commentsCount'] ?? 0,
      authorId: json['authorId'],
    );
  }

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'title': title,
      'description': description,
      'category': category,
      'priority': priority,
      'status': status,
    };
    if (location != null) map['location'] = location;
    return map;
  }
}
