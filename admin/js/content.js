// Content Monitoring JavaScript

// Sample data
let reviews = [
    {
        id: 1,
        userName: "山田太郎",
        userEmail: "yamada@example.com",
        cafeName: "カフェ・ド・パリ 渋谷店",
        rating: 5,
        content: "コーヒーの香りが素晴らしい！雰囲気も最高です。スタッフの対応も丁寧で、また来たいと思います。",
        date: "2025-10-20 09:30",
        status: "approved"
    },
    {
        id: 2,
        userName: "佐藤花子",
        userEmail: "sato@example.com",
        cafeName: "スターバックスコーヒー 新宿南口店",
        rating: 1,
        content: "最悪な店。二度と行きません。店員の態度が悪すぎる。",
        date: "2025-10-20 08:15",
        status: "pending"
    },
    {
        id: 3,
        userName: "鈴木一郎",
        userEmail: "suzuki@example.com",
        cafeName: "ブルーボトルコーヒー 青山カフェ",
        rating: 4.8,
        content: "静かで落ち着いた雰囲気。コーヒーの品質も素晴らしい。",
        date: "2025-10-19 18:45",
        status: "approved"
    },
    {
        id: 4,
        userName: "高橋美咲",
        userEmail: "takahashi@example.com",
        cafeName: "コメダ珈琲店 池袋東口店",
        rating: 2,
        content: "汚い店。ゴキブリがいた。保健所に通報します。",
        date: "2025-10-19 14:20",
        status: "pending"
    },
    {
        id: 5,
        userName: "伊藤健",
        userEmail: "ito@example.com",
        cafeName: "猿田彦珈琲 恵比寿本店",
        rating: 4.7,
        content: "日本のコーヒー文化を感じられる素敵なお店です。",
        date: "2025-10-19 10:00",
        status: "approved"
    },
    {
        id: 6,
        userName: "田中次郎",
        userEmail: "tanaka2@example.com",
        cafeName: "カフェ・ド・パリ 渋谷店",
        rating: 1,
        content: "ぼったくり店。絶対に行くな。詐欺だ。",
        date: "2025-10-18 16:30",
        status: "pending"
    }
];

let reports = [
    {
        id: 1,
        reporterName: "小林真理",
        reporterEmail: "kobayashi@example.com",
        reviewId: 2,
        reason: "不適切な言葉遣い",
        content: "「最悪」「二度と行きません」など過度に否定的な表現",
        date: "2025-10-20 10:00",
        status: "pending"
    },
    {
        id: 2,
        reporterName: "中村翔太",
        reporterEmail: "nakamura@example.com",
        reviewId: 4,
        reason: "虚偽の情報",
        content: "事実と異なる内容が含まれている可能性",
        date: "2025-10-19 15:00",
        status: "pending"
    },
    {
        id: 3,
        reporterName: "渡辺美咲",
        reporterEmail: "watanabe@example.com",
        reviewId: 6,
        reason: "誹謗中傷",
        content: "事実無根の中傷的な内容",
        date: "2025-10-18 17:00",
        status: "resolved"
    }
];

// Load content on page load
window.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    loadReports();
});

// Switch tabs
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tab === 'reviews') {
        document.querySelector('.tab-btn:nth-child(1)').classList.add('active');
        document.getElementById('reviewsTab').classList.add('active');
    } else {
        document.querySelector('.tab-btn:nth-child(2)').classList.add('active');
        document.getElementById('reportsTab').classList.add('active');
    }
}

// Load and display reviews
function loadReviews() {
    const container = document.getElementById('reviewList');
    if (!container) return;

    container.innerHTML = reviews.map(review => {
        const stars = '★'.repeat(Math.floor(review.rating));
        const statusBadge = getStatusBadge(review.status);
        
        return `
            <div class="monitoring-item">
                <div class="monitoring-header">
                    <div class="monitoring-user">
                        <i class="fas fa-user-circle"></i>
                        <div class="monitoring-user-info">
                            <h4>${review.userName}</h4>
                            <small>${review.cafeName} - ${review.date}</small>
                        </div>
                    </div>
                    <div>
                        <div class="monitoring-rating">${stars} ${review.rating}</div>
                        ${statusBadge}
                    </div>
                </div>
                <div class="monitoring-content">
                    ${review.content}
                </div>
                <div class="monitoring-actions">
                    ${review.status === 'pending' ? `
                        <button class="btn-success btn-sm" onclick="approveReview(${review.id})">
                            <i class="fas fa-check"></i> 承認
                        </button>
                    ` : ''}
                    ${review.status !== 'hidden' ? `
                        <button class="btn-warning btn-sm" onclick="hideReview(${review.id})">
                            <i class="fas fa-eye-slash"></i> 非表示
                        </button>
                    ` : `
                        <button class="btn-success btn-sm" onclick="showReview(${review.id})">
                            <i class="fas fa-eye"></i> 表示
                        </button>
                    `}
                    ${review.status !== 'deleted' ? `
                        <button class="btn-danger btn-sm" onclick="deleteReview(${review.id})">
                            <i class="fas fa-trash"></i> 削除
                        </button>
                    ` : ''}
                    <button class="btn-secondary btn-sm" onclick="viewReviewDetail(${review.id})">
                        <i class="fas fa-info-circle"></i> 詳細
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Load and display reports
function loadReports() {
    const container = document.getElementById('reportList');
    if (!container) return;

    container.innerHTML = reports.map(report => {
        const statusBadge = getReportStatusBadge(report.status);
        
        return `
            <div class="monitoring-item">
                <div class="monitoring-header">
                    <div class="monitoring-user">
                        <i class="fas fa-flag"></i>
                        <div class="monitoring-user-info">
                            <h4>${report.reporterName}</h4>
                            <small>報告日時: ${report.date}</small>
                        </div>
                    </div>
                    ${statusBadge}
                </div>
                <div class="monitoring-content">
                    <p><strong>理由:</strong> ${report.reason}</p>
                    <p>${report.content}</p>
                </div>
                <div class="monitoring-actions">
                    ${report.status === 'pending' ? `
                        <button class="btn-success btn-sm" onclick="resolveReport(${report.id})">
                            <i class="fas fa-check"></i> 対応完了
                        </button>
                        <button class="btn-danger btn-sm" onclick="rejectReport(${report.id})">
                            <i class="fas fa-times"></i> 却下
                        </button>
                    ` : ''}
                    <button class="btn-secondary btn-sm" onclick="viewReportedReview(${report.reviewId})">
                        <i class="fas fa-comment"></i> 対象レビュー表示
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        pending: '<span class="badge pending">要確認</span>',
        approved: '<span class="badge active">承認済み</span>',
        hidden: '<span class="badge inactive">非表示</span>',
        deleted: '<span class="badge inactive">削除済み</span>'
    };
    return badges[status] || '';
}

// Get report status badge
function getReportStatusBadge(status) {
    const badges = {
        pending: '<span class="badge pending">未対応</span>',
        resolved: '<span class="badge active">対応済み</span>',
        rejected: '<span class="badge inactive">却下</span>'
    };
    return badges[status] || '';
}

// Filter reviews
function filterReviews() {
    const searchTerm = document.getElementById('reviewSearch').value.toLowerCase();
    const statusFilter = document.getElementById('reviewStatusFilter').value;
    const ratingFilter = document.getElementById('reviewRatingFilter').value;

    const filtered = reviews.filter(review => {
        const matchesSearch = review.content.toLowerCase().includes(searchTerm) || 
                            review.userName.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || review.status === statusFilter;
        const matchesRating = !ratingFilter || Math.floor(review.rating) === parseInt(ratingFilter);
        return matchesSearch && matchesStatus && matchesRating;
    });

    const container = document.getElementById('reviewList');
    container.innerHTML = filtered.map(review => {
        const stars = '★'.repeat(Math.floor(review.rating));
        const statusBadge = getStatusBadge(review.status);
        
        return `
            <div class="monitoring-item">
                <div class="monitoring-header">
                    <div class="monitoring-user">
                        <i class="fas fa-user-circle"></i>
                        <div class="monitoring-user-info">
                            <h4>${review.userName}</h4>
                            <small>${review.cafeName} - ${review.date}</small>
                        </div>
                    </div>
                    <div>
                        <div class="monitoring-rating">${stars} ${review.rating}</div>
                        ${statusBadge}
                    </div>
                </div>
                <div class="monitoring-content">
                    ${review.content}
                </div>
                <div class="monitoring-actions">
                    ${review.status === 'pending' ? `
                        <button class="btn-success btn-sm" onclick="approveReview(${review.id})">
                            <i class="fas fa-check"></i> 承認
                        </button>
                    ` : ''}
                    ${review.status !== 'hidden' ? `
                        <button class="btn-warning btn-sm" onclick="hideReview(${review.id})">
                            <i class="fas fa-eye-slash"></i> 非表示
                        </button>
                    ` : `
                        <button class="btn-success btn-sm" onclick="showReview(${review.id})">
                            <i class="fas fa-eye"></i> 表示
                        </button>
                    `}
                    ${review.status !== 'deleted' ? `
                        <button class="btn-danger btn-sm" onclick="deleteReview(${review.id})">
                            <i class="fas fa-trash"></i> 削除
                        </button>
                    ` : ''}
                    <button class="btn-secondary btn-sm" onclick="viewReviewDetail(${review.id})">
                        <i class="fas fa-info-circle"></i> 詳細
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Filter reports
function filterReports() {
    const searchTerm = document.getElementById('reportSearch').value.toLowerCase();
    const statusFilter = document.getElementById('reportStatusFilter').value;

    const filtered = reports.filter(report => {
        const matchesSearch = report.content.toLowerCase().includes(searchTerm) || 
                            report.reason.toLowerCase().includes(searchTerm);
        const matchesStatus = !statusFilter || report.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const container = document.getElementById('reportList');
    container.innerHTML = filtered.map(report => {
        const statusBadge = getReportStatusBadge(report.status);
        
        return `
            <div class="monitoring-item">
                <div class="monitoring-header">
                    <div class="monitoring-user">
                        <i class="fas fa-flag"></i>
                        <div class="monitoring-user-info">
                            <h4>${report.reporterName}</h4>
                            <small>報告日時: ${report.date}</small>
                        </div>
                    </div>
                    ${statusBadge}
                </div>
                <div class="monitoring-content">
                    <p><strong>理由:</strong> ${report.reason}</p>
                    <p>${report.content}</p>
                </div>
                <div class="monitoring-actions">
                    ${report.status === 'pending' ? `
                        <button class="btn-success btn-sm" onclick="resolveReport(${report.id})">
                            <i class="fas fa-check"></i> 対応完了
                        </button>
                        <button class="btn-danger btn-sm" onclick="rejectReport(${report.id})">
                            <i class="fas fa-times"></i> 却下
                        </button>
                    ` : ''}
                    <button class="btn-secondary btn-sm" onclick="viewReportedReview(${report.reviewId})">
                        <i class="fas fa-comment"></i> 対象レビュー表示
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Review actions
function approveReview(id) {
    const review = reviews.find(r => r.id === id);
    if (review) {
        review.status = 'approved';
        loadReviews();
        showNotification('レビューを承認しました', 'success');
    }
}

function hideReview(id) {
    const review = reviews.find(r => r.id === id);
    if (review && confirm('このレビューを非表示にしますか？')) {
        review.status = 'hidden';
        loadReviews();
        showNotification('レビューを非表示にしました', 'success');
    }
}

function showReview(id) {
    const review = reviews.find(r => r.id === id);
    if (review) {
        review.status = 'approved';
        loadReviews();
        showNotification('レビューを表示しました', 'success');
    }
}

function deleteReview(id) {
    if (confirm('このレビューを削除しますか？この操作は取り消せません。')) {
        const review = reviews.find(r => r.id === id);
        if (review) {
            review.status = 'deleted';
            loadReviews();
            showNotification('レビューを削除しました', 'success');
        }
    }
}

function viewReviewDetail(id) {
    const review = reviews.find(r => r.id === id);
    if (!review) return;

    const stars = '★'.repeat(Math.floor(review.rating));
    const content = document.getElementById('reviewDetailContent');
    content.innerHTML = `
        <div class="user-detail">
            <div class="user-detail-row">
                <div class="user-detail-label">レビューID</div>
                <div class="user-detail-value">${review.id}</div>
            </div>
            <div class="user-detail-row">
                <div class="user-detail-label">投稿者</div>
                <div class="user-detail-value">${review.userName} (${review.userEmail})</div>
            </div>
            <div class="user-detail-row">
                <div class="user-detail-label">対象カフェ</div>
                <div class="user-detail-value">${review.cafeName}</div>
            </div>
            <div class="user-detail-row">
                <div class="user-detail-label">評価</div>
                <div class="user-detail-value">${stars} ${review.rating}</div>
            </div>
            <div class="user-detail-row">
                <div class="user-detail-label">投稿日時</div>
                <div class="user-detail-value">${review.date}</div>
            </div>
            <div class="user-detail-row">
                <div class="user-detail-label">ステータス</div>
                <div class="user-detail-value">${getStatusBadge(review.status)}</div>
            </div>
            <div class="user-detail-row">
                <div class="user-detail-label">内容</div>
                <div class="user-detail-value">${review.content}</div>
            </div>
        </div>
    `;

    document.getElementById('reviewModal').classList.add('show');
}

function closeReviewModal() {
    document.getElementById('reviewModal').classList.remove('show');
}

// Report actions
function resolveReport(id) {
    const report = reports.find(r => r.id === id);
    if (report && confirm('この報告を対応完了にしますか？')) {
        report.status = 'resolved';
        loadReports();
        showNotification('報告を対応完了にしました', 'success');
    }
}

function rejectReport(id) {
    const report = reports.find(r => r.id === id);
    if (report && confirm('この報告を却下しますか？')) {
        report.status = 'rejected';
        loadReports();
        showNotification('報告を却下しました', 'success');
    }
}

function viewReportedReview(reviewId) {
    viewReviewDetail(reviewId);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('reviewModal');
    if (event.target === modal) {
        closeReviewModal();
    }
}
