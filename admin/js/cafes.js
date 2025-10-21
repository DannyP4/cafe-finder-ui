// Cafe Management JavaScript

// Sample data
let cafes = [
    {
        id: 1,
        name: "カフェ・ド・パリ 渋谷店",
        address: "東京都渋谷区渋谷1-2-3",
        rating: 4.8,
        reviewCount: 156,
        status: "active",
        description: "フランス風の洗練された雰囲気のカフェ",
        hours: "月-金 8:00-20:00, 土日 9:00-21:00",
        image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
        menu: [
            { name: "エスプレッソ", price: "¥450" },
            { name: "カプチーノ", price: "¥520" }
        ],
        featured: true
    },
    {
        id: 2,
        name: "スターバックスコーヒー 新宿南口店",
        address: "東京都新宿区新宿3-38-1",
        rating: 4.5,
        reviewCount: 234,
        status: "active",
        description: "世界的に有名なコーヒーチェーン",
        hours: "毎日 7:00-22:00",
        image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400",
        menu: [
            { name: "ドリップコーヒー", price: "¥380" },
            { name: "キャラメルマキアート", price: "¥520" }
        ],
        featured: true
    },
    {
        id: 3,
        name: "ブルーボトルコーヒー 青山カフェ",
        address: "東京都港区南青山3-13-14",
        rating: 4.9,
        reviewCount: 189,
        status: "active",
        description: "シングルオリジンのスペシャルティコーヒー",
        hours: "毎日 8:00-19:00",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
        menu: [
            { name: "ハンドドリップコーヒー", price: "¥580" }
        ],
        featured: false
    },
    {
        id: 4,
        name: "コメダ珈琲店 池袋東口店",
        address: "東京都豊島区南池袋1-25-1",
        rating: 4.3,
        reviewCount: 145,
        status: "active",
        description: "名古屋発祥の喫茶店",
        hours: "毎日 7:00-23:00",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        menu: [
            { name: "ブレンドコーヒー", price: "¥460" },
            { name: "シロノワール", price: "¥780" }
        ],
        featured: false
    },
    {
        id: 5,
        name: "猿田彦珈琲 恵比寿本店",
        address: "東京都渋谷区恵比寿1-6-6",
        rating: 4.7,
        reviewCount: 198,
        status: "active",
        description: "日本のスペシャルティコーヒーの先駆者",
        hours: "毎日 8:00-20:00",
        image: "https://images.unsplash.com/photo-1501492673258-e5c5e44e66c8?w=400",
        menu: [
            { name: "猿田彦ブレンド", price: "¥500" }
        ],
        featured: false
    }
];

let currentCafe = null;

// Load cafes on page load
window.addEventListener('DOMContentLoaded', () => {
    loadCafes();
});

// Load and display cafes
function loadCafes() {
    const tbody = document.getElementById('cafeTableBody');
    if (!tbody) return;

    tbody.innerHTML = cafes.map(cafe => `
        <tr>
            <td>${cafe.id}</td>
            <td><strong>${cafe.name}</strong></td>
            <td>${cafe.address}</td>
            <td>⭐ ${cafe.rating}</td>
            <td>${cafe.reviewCount}</td>
            <td>
                <span class="badge ${cafe.status === 'active' ? 'active' : 'inactive'}">
                    ${cafe.status === 'active' ? '営業中' : '閉店'}
                </span>
            </td>
            <td>
                <button class="btn-icon" onclick="editCafe(${cafe.id})" title="編集">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteCafe(${cafe.id})" title="削除">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Filter cafes
function filterCafes() {
    const searchTerm = document.getElementById('cafeSearch').value.toLowerCase();
    const statusFilter = document.getElementById('cafeStatusFilter').value;

    const filtered = cafes.filter(cafe => {
        const matchesSearch = cafe.name.toLowerCase().includes(searchTerm) || 
                            cafe.address.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || cafe.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const tbody = document.getElementById('cafeTableBody');
    tbody.innerHTML = filtered.map(cafe => `
        <tr>
            <td>${cafe.id}</td>
            <td><strong>${cafe.name}</strong></td>
            <td>${cafe.address}</td>
            <td>⭐ ${cafe.rating}</td>
            <td>${cafe.reviewCount}</td>
            <td>
                <span class="badge ${cafe.status === 'active' ? 'active' : 'inactive'}">
                    ${cafe.status === 'active' ? '営業中' : '閉店'}
                </span>
            </td>
            <td>
                <button class="btn-icon" onclick="editCafe(${cafe.id})" title="編集">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon" onclick="deleteCafe(${cafe.id})" title="削除">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Open add cafe modal
function openAddCafeModal() {
    currentCafe = null;
    document.getElementById('modalTitle').textContent = 'カフェ追加';
    document.getElementById('cafeForm').reset();
    
    // Reset menu items
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = `
        <div class="menu-item-row">
            <input type="text" placeholder="メニュー名" class="menu-name">
            <input type="text" placeholder="価格 (例: ¥450)" class="menu-price">
            <button type="button" class="btn-icon" onclick="removeMenuItem(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    document.getElementById('cafeModal').classList.add('show');
}

// Edit cafe
function editCafe(id) {
    currentCafe = cafes.find(c => c.id === id);
    if (!currentCafe) return;

    document.getElementById('modalTitle').textContent = 'カフェ編集';
    document.getElementById('cafeName').value = currentCafe.name;
    document.getElementById('cafeAddress').value = currentCafe.address;
    document.getElementById('cafeRating').value = currentCafe.rating;
    document.getElementById('cafeDistance').value = currentCafe.distance || 0;
    document.getElementById('cafeImage').value = currentCafe.image || '';
    document.getElementById('cafeDescription').value = currentCafe.description;
    document.getElementById('cafeHours').value = currentCafe.hours || '';
    document.getElementById('cafeFeatured').checked = currentCafe.featured || false;

    // Load menu items
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = currentCafe.menu.map(item => `
        <div class="menu-item-row">
            <input type="text" placeholder="メニュー名" class="menu-name" value="${item.name}">
            <input type="text" placeholder="価格 (例: ¥450)" class="menu-price" value="${item.price}">
            <button type="button" class="btn-icon" onclick="removeMenuItem(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    document.getElementById('cafeModal').classList.add('show');
}

// Close cafe modal
function closeCafeModal() {
    document.getElementById('cafeModal').classList.remove('show');
    currentCafe = null;
}

// Save cafe
function saveCafe(event) {
    event.preventDefault();

    const name = document.getElementById('cafeName').value;
    const address = document.getElementById('cafeAddress').value;
    const rating = parseFloat(document.getElementById('cafeRating').value);
    const distance = parseFloat(document.getElementById('cafeDistance').value);
    const image = document.getElementById('cafeImage').value;
    const description = document.getElementById('cafeDescription').value;
    const hours = document.getElementById('cafeHours').value;
    const featured = document.getElementById('cafeFeatured').checked;

    // Get menu items
    const menuRows = document.querySelectorAll('.menu-item-row');
    const menu = Array.from(menuRows).map(row => ({
        name: row.querySelector('.menu-name').value,
        price: row.querySelector('.menu-price').value
    })).filter(item => item.name && item.price);

    if (currentCafe) {
        // Edit existing cafe
        currentCafe.name = name;
        currentCafe.address = address;
        currentCafe.rating = rating;
        currentCafe.distance = distance;
        currentCafe.image = image;
        currentCafe.description = description;
        currentCafe.hours = hours;
        currentCafe.featured = featured;
        currentCafe.menu = menu;
        showNotification('カフェ情報を更新しました', 'success');
    } else {
        // Add new cafe
        const newCafe = {
            id: cafes.length + 1,
            name,
            address,
            rating,
            distance,
            image,
            description,
            hours,
            featured,
            menu,
            reviewCount: 0,
            status: 'active'
        };
        cafes.push(newCafe);
        showNotification('新しいカフェを追加しました', 'success');
    }

    closeCafeModal();
    loadCafes();
}

// Delete cafe
function deleteCafe(id) {
    if (confirm('本当にこのカフェを削除しますか？')) {
        cafes = cafes.filter(c => c.id !== id);
        loadCafes();
        showNotification('カフェを削除しました', 'success');
    }
}

// Add menu item
function addMenuItem() {
    const menuContainer = document.getElementById('menuItems');
    const newRow = document.createElement('div');
    newRow.className = 'menu-item-row';
    newRow.innerHTML = `
        <input type="text" placeholder="メニュー名" class="menu-name">
        <input type="text" placeholder="価格 (例: ¥450)" class="menu-price">
        <button type="button" class="btn-icon" onclick="removeMenuItem(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    menuContainer.appendChild(newRow);
}

// Remove menu item
function removeMenuItem(button) {
    const menuContainer = document.getElementById('menuItems');
    if (menuContainer.children.length > 1) {
        button.closest('.menu-item-row').remove();
    } else {
        alert('少なくとも1つのメニュー項目が必要です');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('cafeModal');
    if (event.target === modal) {
        closeCafeModal();
    }
}
