import { useEffect, useState } from 'react';
import { deFi_Bank_backend } from 'declarations/deFi-Bank-backend';

function App() {
  const [bal, setBal] = useState();
  const [topUp, setTopUp] = useState('');
  const [withdraw, setWithdraw] = useState('');

  async function fetchData() {
    const bal = await deFi_Bank_backend.getBalance();
    setBal(bal);
  }
  useEffect(() => {
    fetchData();
  }, []);
  
  async function handleSubmit(event) {
    event.preventDefault();
    if (topUp) {
      await deFi_Bank_backend.topUp(parseFloat(topUp));
    }
    if (withdraw) {
      await deFi_Bank_backend.withdraw(parseFloat(withdraw));
    }
    setTopUp('');
    setWithdraw('');
    await fetchData();
  }

  return (
    <div className="container">
      <img src="logo.png" alt="DBank logo" width="100"/>
      <h1>Current Balance: $ {bal} </h1> 
      <div className="divider"></div>
      <form onSubmit={handleSubmit}>
        <h2>Amount to Top Up</h2>
        <input id="input-amount" type="number" step="0.01" min={0} name="topUp" onChange={(e) => {setTopUp(e.target.value)}} value={topUp} />
        <h2>Amount to Withdraw</h2>
        <input id="withdrawal-amount" type="number" name="withdraw" step="0.01" min={0} onChange={(e) => {setWithdraw(e.target.value)}} value={withdraw} />
        <input id="submit-btn" type="submit" value="Finalise Transaction" />
      </form>
    </div>
  );
}

export default App;
