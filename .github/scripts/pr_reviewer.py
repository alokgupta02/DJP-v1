import os
import requests
import asyncio
from google.antigravity import Agent, LocalAgentConfig

async def main():
    github_token = os.environ.get("GITHUB_TOKEN")
    gemini_api_key = os.environ.get("GEMINI_API_KEY")
    repo = os.environ.get("GITHUB_REPOSITORY")
    pr_number = os.environ.get("PR_NUMBER")
    reviewer_username = os.environ.get("REVIEWER_USERNAME")

    if not all([github_token, gemini_api_key, repo, pr_number, reviewer_username]):
        print("Missing required environment variables. Ensure GITHUB_TOKEN, GEMINI_API_KEY, GITHUB_REPOSITORY, PR_NUMBER, and REVIEWER_USERNAME are set.")
        return

    # 1. Fetch the PR Diff
    diff_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}"
    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3.diff"
    }
    
    print(f"Fetching diff for PR #{pr_number} in {repo}...")
    response = requests.get(diff_url, headers=headers)
    if response.status_code != 200:
        print(f"Failed to fetch PR diff: {response.status_code} {response.text}")
        return
        
    pr_diff = response.text
    if not pr_diff.strip():
        print("Empty PR diff. Nothing to review.")
        return

    # 2. Analyze the Diff with Google Antigravity Agent
    print("Analyzing diff with Google Antigravity...")
    
    prompt = f"""You are an expert code reviewer. Please review the following pull request diff.
Focus on identifying:
1. Potential bugs or logical errors.
2. Security vulnerabilities.
3. Performance issues.
4. Code readability and maintainability.

Provide a concise, high-level summary of your findings, followed by specific bullet points if there are issues. Keep your tone constructive and helpful.

Pull Request Diff:
```diff
{pr_diff}
```
"""

    config = LocalAgentConfig(api_key=gemini_api_key)
    try:
        async with Agent(config) as agent:
            review_response = await agent.chat(prompt)
            review_text = await review_response.text()
    except Exception as e:
        print(f"Error communicating with Google Antigravity Agent: {e}")
        return

    # 3. Post the review comment back to GitHub
    comment_url = f"https://api.github.com/repos/{repo}/issues/{pr_number}/comments"
    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }
    payload = {
        "body": f"🤖 **AI PR Review (Powered by Google Antigravity)**\n\n{review_text}\n\n---\n🔔 **Alerting:** @{reviewer_username} - Please review and approve this PR."
    }

    print("Posting review comment to GitHub...")
    post_response = requests.post(comment_url, headers=headers, json=payload)
    if post_response.status_code == 201:
        print("Successfully posted PR review.")
        
        # 4. Request a formal review from the user
        print(f"Requesting formal review from {reviewer_username}...")
        review_request_url = f"https://api.github.com/repos/{repo}/pulls/{pr_number}/requested_reviewers"
        review_payload = {
            "reviewers": [reviewer_username]
        }
        review_response = requests.post(review_request_url, headers=headers, json=review_payload)
        if review_response.status_code == 201:
            print(f"Successfully requested review from {reviewer_username}.")
        else:
            print(f"Failed to request review: {review_response.status_code} {review_response.text}")
            
    else:
        print(f"Failed to post comment: {post_response.status_code} {post_response.text}")

if __name__ == "__main__":
    asyncio.run(main())
