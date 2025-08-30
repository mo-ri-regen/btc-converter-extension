document.addEventListener('DOMContentLoaded', function() {
  const btcInput = document.getElementById('btcAmount');
  const convertBtn = document.getElementById('convertBtn');
  const usdAmount = document.getElementById('usdAmount');
  const jpyAmount = document.getElementById('jpyAmount');
  const loading = document.getElementById('loading');
  const results = document.getElementById('results');

  convertBtn.addEventListener('click', convertBTC);
  btcInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      convertBTC();
    }
  });

  async function convertBTC() {
    const btcValue = parseFloat(btcInput.value);
    
    if (!btcValue || btcValue <= 0) {
      alert('有効なBTC数量を入力してください');
      return;
    }

    showLoading(true);
    
    try {
      const btcPriceUSD = await getBTCPriceInUSD();
      const usdToJpyRate = await getUSDToJPYRate();
      
      const totalUSD = btcValue * btcPriceUSD;
      const totalJPY = totalUSD * usdToJpyRate;
      
      usdAmount.textContent = `$${totalUSD.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      jpyAmount.textContent = `¥${Math.round(totalJPY).toLocaleString('ja-JP')}`;
      
    } catch (error) {
      console.error('Error:', error);
      alert('価格の取得に失敗しました。しばらく後でお試しください。');
    } finally {
      showLoading(false);
    }
  }

  async function getBTCPriceInUSD() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await response.json();
    return parseFloat(data.bpi.USD.rate.replace(/,/g, ''));
  }

  async function getUSDToJPYRate() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    return data.rates.JPY;
  }

  function showLoading(show) {
    if (show) {
      loading.style.display = 'block';
      results.style.display = 'none';
      convertBtn.disabled = true;
    } else {
      loading.style.display = 'none';
      results.style.display = 'block';
      convertBtn.disabled = false;
    }
  }
});