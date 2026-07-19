import 'dart:convert';
import 'dart:io' show Platform;
import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/issue.dart';
import '../models/user.dart';

class ApiService {
  static String? _token;
  static User? _currentUser;

  static String getBaseUrl() {
    if (kIsWeb) {
      return 'http://localhost:8082/djp/api/v1';
    } else if (Platform.isAndroid) {
      return 'http://10.0.2.2:8082/djp/api/v1';
    } else {
      return 'http://localhost:8082/djp/api/v1';
    }
  }

  static Future<void> init() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('jwt_token');
    final userJson = prefs.getString('current_user');
    if (userJson != null) {
      try {
        _currentUser = User.fromJson(json.decode(userJson));
      } catch (_) {
        _currentUser = null;
      }
    }
  }

  static String? get token => _token;
  static User? get currentUser => _currentUser;
  static bool get isLoggedIn => _token != null && _token!.isNotEmpty;

  static Future<User> devLogin(String email) async {
    final url = Uri.parse('${getBaseUrl()}/auth/dev-login');
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'email': email}),
    );

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      _token = data['token'];
      _currentUser = User.fromJson(data['user']);

      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('jwt_token', _token!);
      await prefs.setString('current_user', json.encode(_currentUser!.toJson()));

      return _currentUser!;
    } else {
      throw Exception('Failed dev-login: ${response.statusCode} - ${response.body}');
    }
  }

  static Future<void> logout() async {
    _token = null;
    _currentUser = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('jwt_token');
    await prefs.remove('current_user');
  }

  static Future<List<Issue>> getIssues() async {
    final url = Uri.parse('${getBaseUrl()}/issues');
    final headers = <String, String>{
      'Content-Type': 'application/json',
    };
    if (_token != null) headers['Authorization'] = 'Bearer $_token';

    final response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      final List<dynamic> list = json.decode(response.body);
      return list.map((item) => Issue.fromJson(item)).toList();
    } else {
      throw Exception('Failed to load issues: ${response.statusCode}');
    }
  }

  static Future<Issue> createIssue(Issue issue) async {
    final url = Uri.parse('${getBaseUrl()}/issues');
    final headers = <String, String>{
      'Content-Type': 'application/json',
    };
    if (_token != null) headers['Authorization'] = 'Bearer $_token';

    final response = await http.post(
      url,
      headers: headers,
      body: json.encode(issue.toJson()),
    );

    if (response.statusCode == 200 || response.statusCode == 201) {
      return Issue.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to create issue: ${response.statusCode} - ${response.body}');
    }
  }
}
