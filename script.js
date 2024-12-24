const sheetUrl = 'LIÊN_KẾT_API_CỦA_BẠN'; // Thay thế bằng liên kết API của bạn

document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = this.value;
        fetchData(query);
    }
});

function fetchData(query) {
    fetch(sheetUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Xóa kết quả cũ

            rows.forEach(row => {
                if (row.some(cell => cell.includes(query))) {
                    const p = document.createElement('p');
                    p.textContent = row.join(', ');
                    resultDiv.appendChild(p);
                }
            });
        })
        .catch(error => {
            console.error('Lỗi:', error);
        });
}
