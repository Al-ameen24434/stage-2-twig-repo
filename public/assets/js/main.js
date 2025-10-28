// Shared utilities and initialization

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-500 hover:text-gray-700">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function initTestData() {
  try {
    const testUser = registerUser('test@test.com', '123456', 'Test User');
    
    createTicket(
      'Unable to login to account',
      "I'm getting an error message when trying to log in.",
      'open',
      'high',
      testUser.id
    );

    createTicket(
      'Feature request: Dark mode',
      'Would love to have a dark mode option for the application.',
      'in_progress',
      'medium',
      testUser.id
    );

    createTicket(
      'Bug: Dashboard not loading',
      'Dashboard page is showing a blank screen after logging in.',
      'open',
      'high',
      testUser.id
    );

    createTicket(
      'Question about billing',
      'I have a question about the pricing plans.',
      'closed',
      'low',
      testUser.id
    );
  } catch (error) {
    // Test user already exists
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
