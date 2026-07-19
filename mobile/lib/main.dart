import 'package:flutter/material.dart';
import 'screens/issues_feed_screen.dart';
import 'screens/login_screen.dart';
import 'services/api_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await ApiService.init();
  runApp(const BmadMobileApp());
}

class BmadMobileApp extends StatelessWidget {
  const BmadMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'DJP Citizen Mobile App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1E3A8A),
          primary: const Color(0xFF1E3A8A),
        ),
        useMaterial3: true,
      ),
      home: ApiService.isLoggedIn ? const IssuesFeedScreen() : const LoginScreen(),
    );
  }
}
