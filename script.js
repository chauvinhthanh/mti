const sheetId = '1Kz0GxLahLLRO6YrAGtWtqARSZnqS3-heRJ41Pry-gkM/'; // Thay thế bằng ID của Google Sheet
const apiKey = 'AIzaSyAidbBXgq1jO9sPDX-kLm2atL_z6ANLC6w'; // Thay thế bằng API key của bạn
const sheetRange = 'Sheet1!A1:D'; // Thay thế bằng range của bạn

document.getElementById('search').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const query = this.value;
        fetchData(query);
    }
});

function fetchData(query) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetRange}?key=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const rows = data.values;
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
    // Xóa dữ liệu nhập liệu
    document.getElementById('query').value = '';
}
