import 'package:flutter/material.dart';
import '../models/issue.dart';
import '../services/api_service.dart';
import 'create_issue_dialog.dart';
import 'login_screen.dart';

class IssuesFeedScreen extends StatefulWidget {
  const IssuesFeedScreen({super.key});

  @override
  State<IssuesFeedScreen> createState() => _IssuesFeedScreenState();
}

class _IssuesFeedScreenState extends State<IssuesFeedScreen> {
  late Future<List<Issue>> _issuesFuture;

  @override
  void initState() {
    super.initState();
    _refresh();
  }

  void _refresh() {
    setState(() {
      _issuesFuture = ApiService.getIssues();
    });
  }

  Future<void> _handleLogout() async {
    await ApiService.logout();
    if (!mounted) return;
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(builder: (_) => const LoginScreen()),
    );
  }

  Color _getCategoryColor(String category) {
    switch (category.toUpperCase()) {
      case 'INFRASTRUCTURE': return const Color(0xFF2563EB);
      case 'SANITATION': return const Color(0xFF059669);
      case 'SAFETY': return const Color(0xFFDC2626);
      case 'CORRUPTION': return const Color(0xFF7C3AED);
      default: return const Color(0xFF4B5563);
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = ApiService.currentUser;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color(0xFF1E3A8A),
        foregroundColor: Colors.white,
        title: const Text('Civic Issues Feed', style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          if (user != null)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8.0),
              child: Center(
                child: Text(
                  user.email,
                  style: const TextStyle(fontSize: 12, color: Colors.white70),
                ),
              ),
            ),
          IconButton(
            icon: const Icon(Icons.refresh),
            tooltip: 'Refresh Feed',
            onPressed: _refresh,
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: _handleLogout,
          ),
        ],
      ),
      body: FutureBuilder<List<Issue>>(
        future: _issuesFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.error_outline, size: 48, color: Colors.red),
                    const SizedBox(height: 12),
                    Text(
                      'Failed to load issues:\n${snapshot.error}',
                      textAlign: TextAlign.center,
                      style: const TextStyle(color: Colors.red),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _refresh,
                      child: const Text('Try Again'),
                    ),
                  ],
                ),
              ),
            );
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(
              child: Text('No civic issues reported yet.'),
            );
          }

          final issues = snapshot.data!;
          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: issues.length,
            separatorBuilder: (context, index) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final issue = issues[index];
              final catColor = _getCategoryColor(issue.category);

              return Card(
                elevation: 2,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Wrap(
                        spacing: 8,
                        runSpacing: 4,
                        crossAxisAlignment: WrapCrossAlignment.center,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: catColor.withValues(alpha: 0.1),
                              borderRadius: BorderRadius.circular(6),
                              border: Border.all(color: catColor),
                            ),
                            child: Text(
                              issue.category,
                              style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: catColor),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                            decoration: BoxDecoration(
                              color: Colors.grey.shade200,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              'Priority: ${issue.priority}',
                              style: const TextStyle(fontSize: 10, color: Colors.black87),
                            ),
                          ),
                          Text(
                            issue.status,
                            style: TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.bold,
                              color: issue.status == 'OPEN' ? Colors.green.shade700 : Colors.orange.shade700,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        issue.title,
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF1F2937)),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        issue.description,
                        style: const TextStyle(fontSize: 13, color: Color(0xFF4B5563)),
                      ),
                      if (issue.location != null && issue.location!.isNotEmpty) ...[
                        const SizedBox(height: 10),
                        Row(
                          children: [
                            const Icon(Icons.location_on_outlined, size: 14, color: Colors.grey),
                            const SizedBox(width: 4),
                            Text(
                              issue.location!,
                              style: const TextStyle(fontSize: 12, color: Colors.grey),
                            ),
                          ],
                        ),
                      ],
                      const Divider(height: 24),
                      Row(
                        children: [
                          Icon(Icons.thumb_up_alt_outlined, size: 16, color: Colors.blue.shade700),
                          const SizedBox(width: 4),
                          Text('${issue.supportsCount} Supports', style: const TextStyle(fontSize: 12)),
                          const SizedBox(width: 16),
                          const Icon(Icons.comment_outlined, size: 16, color: Colors.grey),
                          const SizedBox(width: 4),
                          Text('${issue.commentsCount} Comments', style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: const Color(0xFF1E3A8A),
        foregroundColor: Colors.white,
        icon: const Icon(Icons.add),
        label: const Text('REPORT ISSUE'),
        onPressed: () async {
          final created = await showDialog<bool>(
            context: context,
            builder: (_) => const CreateIssueDialog(),
          );
          if (created == true) {
            _refresh();
          }
        },
      ),
    );
  }
}
