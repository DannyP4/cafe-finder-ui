// User Management JavaScript

// Sample data
let users = [
    {
        id: 1,
        name: "田中太郎",
        email: "tanaka@example.com",
        role: "admin",
        status: "active",
        registeredDate: "2024-01-15",
        lastLogin: "2025-10-20 09:30"
    },
    {
        id: 2,
        name: "佐藤花子",
        email: "sato@example.com",
        role: "user",
        status: "active",
        registeredDate: "2024-03-22",
        lastLogin: "2025-10-20 08:15"
    },
    {
        id: 3,
        name: "鈴木一郎",
        email: "suzuki@example.com",
        role: "user",
        status: "active",
        registeredDate: "2024-05-10",
        lastLogin: "2025-10-19 18:45"
    },
    {
        id: 4,
        name: "高橋美咲",
        email: "takahashi@example.com",
        role: "user",
        status: "locked",
        registeredDate: "2024-06-05",
        lastLogin: "2025-10-15 14:20"
    },
    {
        id: 5,
        name: "伊藤健",
        email: "ito@example.com",
        role: "user",
        status: "active",
        registeredDate: "2024-07-18",
        lastLogin: "2025-10-20 07:00"
    },
    {
        id: 6,
        name: "山田美咲",
        email: "yamada@example.com",
        role: "user",
        status: "active",
        registeredDate: "2024-08-22",
        lastLogin: "2025-10-19 20:30"
    },
    {
        id: 7,
        name: "中村翔太",
        email: "nakamura@example.com",
        role: "admin",
        status: "active",
        registeredDate: "2024-02-10",
        lastLogin: "2025-10-20 10:00"
    },
    {
        id: 8,
        name: "小林真理",
        email: "kobayashi@example.com",
        role: "user",
        status: "active",
        registeredDate: "2024-09-05",
        lastLogin: "2025-10-18 16:45"
    }
];

// Load users on page load
window.addEventListener('DOMContentLoaded', () => {
    loadUsers();
});

// Load and display users
function loadUsers() {
    const tbody = document.getElementById('userTableBody');
    if (!tbody) return;

    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>
                <span class="badge ${user.role === 'admin' ? 'admin' : 'user'}">
                    ${user.role === 'admin' ? '管理者' : '一般ユーザー'}
                </span>
            </td>
            <td>${user.registeredDate}</td>
            <td>
                <span class="badge ${user.status === 'active' ? 'active' : 'inactive'}">
                    ${user.status === 'active' ? 'アクティブ' : 'ロック中'}
                </span>
            </td>
            <td>
                <button class="btn-icon" onclick="viewUser(${user.id})" title="詳細">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="toggleUserRole(${user.id})" title="権限変更">
                    <i class="fas fa-user-shield"></i>
                </button>
                <button class="btn-icon" onclick="toggleUserStatus(${user.id})" title="${user.status === 'active' ? 'ロック' : '解除'}">
                    <i class="fas fa-${user.status === 'active' ? 'lock' : 'unlock'}"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Filter users
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const roleFilter = document.getElementById('userRoleFilter').value;
    const statusFilter = document.getElementById('userStatusFilter').value;

    const filtered = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm) || 
                            user.email.toLowerCase().includes(searchTerm);
        const matchesRole = !roleFilter || user.role === roleFilter;
        const matchesStatus = !statusFilter || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = filtered.map(user => `
        <tr>
            <td>${user.id}</td>
            <td><strong>${user.name}</strong></td>
            <td>${user.email}</td>
            <td>
                <span class="badge ${user.role === 'admin' ? 'admin' : 'user'}">
                    ${user.role === 'admin' ? '管理者' : '一般ユーザー'}
                </span>
            </td>
            <td>${user.registeredDate}</td>
            <td>
                <span class="badge ${user.status === 'active' ? 'active' : 'inactive'}">
                    ${user.status === 'active' ? 'アクティブ' : 'ロック中'}
                </span>
            </td>
            <td>
                <button class="btn-icon" onclick="viewUser(${user.id})" title="詳細">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon" onclick="toggleUserRole(${user.id})" title="権限変更">
                    <i class="fas fa-user-shield"></i>
                </button>
                <button class="btn-icon" onclick="toggleUserStatus(${user.id})" title="${user.status === 'active' ? 'ロック' : '解除'}">
                    <i class="fas fa-${user.status === 'active' ? 'lock' : 'unlock'}"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// View user details
function viewUser(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    const content = document.getElementById('userDetailContent');
    content.innerHTML = `
        <div class="user-detail-row">
            <div class="user-detail-label">ユーザーID</div>
            <div class="user-detail-value">${user.id}</div>
        </div>
        <div class="user-detail-row">
            <div class="user-detail-label">ユーザー名</div>
            <div class="user-detail-value">${user.name}</div>
        </div>
        <div class="user-detail-row">
            <div class="user-detail-label">メールアドレス</div>
            <div class="user-detail-value">${user.email}</div>
        </div>
        <div class="user-detail-row">
            <div class="user-detail-label">権限</div>
            <div class="user-detail-value">
                <span class="badge ${user.role === 'admin' ? 'admin' : 'user'}">
                    ${user.role === 'admin' ? '管理者' : '一般ユーザー'}
                </span>
            </div>
        </div>
        <div class="user-detail-row">
            <div class="user-detail-label">ステータス</div>
            <div class="user-detail-value">
                <span class="badge ${user.status === 'active' ? 'active' : 'inactive'}">
                    ${user.status === 'active' ? 'アクティブ' : 'ロック中'}
                </span>
            </div>
        </div>
        <div class="user-detail-row">
            <div class="user-detail-label">登録日</div>
            <div class="user-detail-value">${user.registeredDate}</div>
        </div>
        <div class="user-detail-row">
            <div class="user-detail-label">最終ログイン</div>
            <div class="user-detail-value">${user.lastLogin}</div>
        </div>
    `;

    document.getElementById('userModal').classList.add('show');
}

// Close user modal
function closeUserModal() {
    document.getElementById('userModal').classList.remove('show');
}

// Toggle user role
function toggleUserRole(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    const newRole = user.role === 'admin' ? 'user' : 'admin';
    const roleText = newRole === 'admin' ? '管理者' : '一般ユーザー';
    
    if (confirm(`${user.name}さんの権限を「${roleText}」に変更しますか？`)) {
        user.role = newRole;
        loadUsers();
        showNotification(`権限を「${roleText}」に変更しました`, 'success');
    }
}

// Toggle user status
function toggleUserStatus(id) {
    const user = users.find(u => u.id === id);
    if (!user) return;

    const newStatus = user.status === 'active' ? 'locked' : 'active';
    const statusText = newStatus === 'active' ? 'アクティブ' : 'ロック中';
    const actionText = newStatus === 'active' ? '解除' : 'ロック';
    
    if (confirm(`${user.name}さんのアカウントを${actionText}しますか？`)) {
        user.status = newStatus;
        loadUsers();
        showNotification(`アカウントを${actionText}しました`, 'success');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    if (event.target === modal) {
        closeUserModal();
    }
}
