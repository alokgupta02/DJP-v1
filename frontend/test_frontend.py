from playwright.sync_api import sync_playwright

def run_test():
    url = 'http://localhost:5174'
    console_logs = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        def handle_console_message(msg):
            console_logs.append(f"[{msg.type}] {msg.text}")
            print(f"Console: [{msg.type}] {msg.text}")

        page.on("console", handle_console_message)

        print(f"Navigating to {url}...")
        page.goto(url)
        page.wait_for_load_state('networkidle')
        
        print("Filling login form...")
        page.fill('input[type="email"]', 'alex.mercer@example.com')
        page.fill('input[type="password"]', 'password123')
        page.click('button[type="submit"]')
        page.wait_for_load_state('networkidle')
        
        # Wait a bit for feed to load
        page.wait_for_timeout(2000)
        
        # Check feed page title or content to verify it loaded
        title = page.title()
        print(f"Page title after login: {title}")
        
        browser.close()

    print("\n--- Console Logs ---")
    for log in console_logs:
        print(log)

if __name__ == '__main__':
    run_test()
