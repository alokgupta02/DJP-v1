import 'package:flutter/material.dart';
import '../models/issue.dart';
import '../services/api_service.dart';

class CreateIssueDialog extends StatefulWidget {
  const CreateIssueDialog({super.key});

  @override
  State<CreateIssueDialog> createState() => _CreateIssueDialogState();
}

class _CreateIssueDialogState extends State<CreateIssueDialog> {
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  final _locationController = TextEditingController(text: 'Ward 12, Indiranagar');
  String _category = 'INFRASTRUCTURE';
  String _priority = 'MEDIUM';
  bool _isSubmitting = false;

  final List<String> _categories = ['INFRASTRUCTURE', 'SANITATION', 'SAFETY', 'CORRUPTION', 'EDUCATION', 'HEALTHCARE'];
  final List<String> _priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  Future<void> _submit() async {
    if (_titleController.text.trim().isEmpty || _descController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in Title and Description.')),
      );
      return;
    }

    setState(() => _isSubmitting = true);
    try {
      final newIssue = Issue(
        title: _titleController.text.trim(),
        description: _descController.text.trim(),
        category: _category,
        priority: _priority,
        status: 'OPEN',
        location: _locationController.text.trim(),
      );

      await ApiService.createIssue(newIssue);
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Submit New Civic Issue'),
      content: SingleChildScrollView(
        child: SizedBox(
          width: 400,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: _titleController,
                decoration: const InputDecoration(labelText: 'Issue Title *', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _descController,
                maxLines: 3,
                decoration: const InputDecoration(labelText: 'Description *', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _locationController,
                decoration: const InputDecoration(labelText: 'Location / Ward', border: OutlineInputBorder()),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                initialValue: _category,
                decoration: const InputDecoration(labelText: 'Category', border: OutlineInputBorder()),
                items: _categories.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
                onChanged: (val) => setState(() => _category = val!),
              ),
              const SizedBox(height: 12),
              DropdownButtonFormField<String>(
                initialValue: _priority,
                decoration: const InputDecoration(labelText: 'Priority', border: OutlineInputBorder()),
                items: _priorities.map((p) => DropdownMenuItem(value: p, child: Text(p))).toList(),
                onChanged: (val) => setState(() => _priority = val!),
              ),
            ],
          ),
        ),
      ),
      actions: [
        TextButton(
          onPressed: _isSubmitting ? null : () => Navigator.of(context).pop(false),
          child: const Text('CANCEL'),
        ),
        ElevatedButton(
          onPressed: _isSubmitting ? null : _submit,
          style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF1E3A8A), foregroundColor: Colors.white),
          child: _isSubmitting
              ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
              : const Text('SUBMIT ISSUE'),
        ),
      ],
    );
  }
}
