import { GlobalProvider } from './context/GlobalState';
import ListComponent from "./components/list/list.component";
import IncomeExpenseComponent from "./components/incomeexpense/incomeexpence.component";
import AddTransactionComponent from "./components/addTransaction/addTransaction.component";

function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <div className="App-container">
                    <h2>Expense Tracker</h2>
                    <div className="container">
                    <IncomeExpenseComponent></IncomeExpenseComponent>
                    </div>
                    <h3>History</h3>
                    <ListComponent></ListComponent>
                    <h3>Add new transaction</h3>
                    <AddTransactionComponent></AddTransactionComponent>
                </div>
            </div>
        </GlobalProvider>

    );
}

export default App;

