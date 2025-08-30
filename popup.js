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
    const apis = [
      {
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        parse: (data) => parseFloat(data.bpi.USD.rate.replace(/,/g, ''))
      },
      {
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
        parse: (data) => data.bitcoin.usd
      },
      {
        url: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC',
        parse: (data) => parseFloat(data.data.rates.USD)
      }
    ];

    for (const api of apis) {
      try {
        const response = await fetch(api.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const price = api.parse(data);
        if (price && price > 0) {
          return price;
        }
      } catch (error) {
        console.warn(`Failed to fetch from ${api.url}:`, error);
        continue;
      }
    }
    
    throw new Error('All BTC price APIs failed');
  }

  async function getUSDToJPYRate() {
    const apis = [
      {
        url: 'https://api.exchangerate-api.com/v4/latest/USD',
        parse: (data) => data.rates.JPY
      },
      {
        url: 'https://api.fixer.io/latest?base=USD&symbols=JPY&access_key=YOUR_KEY',
        parse: (data) => data.rates.JPY
      }
    ];

    for (const api of apis) {
      try {
        const response = await fetch(api.url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const rate = api.parse(data);
        if (rate && rate > 0) {
          return rate;
        }
      } catch (error) {
        console.warn(`Failed to fetch from ${api.url}:`, error);
        continue;
      }
    }
    
    // Fallback to a reasonable USD/JPY rate if all APIs fail
    console.warn('All exchange rate APIs failed, using fallback rate');
    return 150; // Approximate USD to JPY rate as fallback
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