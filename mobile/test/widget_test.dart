import 'package:flutter_test/flutter_test.dart';
import 'package:bmad_mobile/models/user.dart';
import 'package:bmad_mobile/models/issue.dart';

void main() {
  group('BMAD Mobile Models Verification', () {
    test('User fromJson / toJson test', () {
      final jsonMap = {
        'id': '123-abc',
        'email': 'citizen@djp.org',
        'name': 'Test Citizen',
        'role': 'CITIZEN',
        'reputationScore': 150,
      };

      final user = User.fromJson(jsonMap);
      expect(user.id, '123-abc');
      expect(user.email, 'citizen@djp.org');
      expect(user.reputationScore, 150);

      final outJson = user.toJson();
      expect(outJson['email'], 'citizen@djp.org');
    });

    test('Issue fromJson / toJson test', () {
      final jsonMap = {
        'id': 'issue-1',
        'title': 'Broken road near metro',
        'description': 'Deep potholes causing traffic.',
        'category': 'INFRASTRUCTURE',
        'priority': 'HIGH',
        'status': 'OPEN',
        'location': 'Ward 12',
        'supportsCount': 10,
        'commentsCount': 3,
      };

      final issue = Issue.fromJson(jsonMap);
      expect(issue.title, 'Broken road near metro');
      expect(issue.priority, 'HIGH');
      expect(issue.supportsCount, 10);

      final outJson = issue.toJson();
      expect(outJson['title'], 'Broken road near metro');
      expect(outJson['location'], 'Ward 12');
    });
  });
}
