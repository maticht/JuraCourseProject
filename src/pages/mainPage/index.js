import React from "react";
import {LeftSide, PageContainer, RightSide, Wrapper,} from "./index.style";

import SelectCategory from "../../components/select/index";
import {InterestingButton} from "../../components/button/index";
import {InterestingInput} from "../../components/input/index";
import {useExpensesContext} from "../../ExpensesContext/ExpensesContext";


const ExpensesTracker = () => {
    const {
        selectedCategory,
        setSelectedCategory,
        expenses,
        setExpenses,
        newExpenseAmount,
        setNewExpenseAmount,
        newExpenseDate,
        setNewExpenseDate,
    } = useExpensesContext();


    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleAddExpense = () => {
        if (selectedCategory && newExpenseAmount && newExpenseDate) {
            try {
                const amount = parseFloat(newExpenseAmount);
                if (isNaN(amount)) {
                    throw new Error("Сумма должна быть числом");
                }
                const newExpense = {
                    id: expenses.length + 1,
                    category: selectedCategory,
                    amount,
                    date: newExpenseDate,
                };

                setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
                setNewExpenseAmount("");
                setNewExpenseDate("");
            } catch (error) {
                alert(error.message);
            }
        }
    };

    const handleDeleteExpense = (id) => {
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(updatedExpenses);
    };

    const filteredExpenses = expenses.filter((expense) =>
        selectedCategory ? expense.category === selectedCategory : true
    );

    return (
        <PageContainer>
            <Wrapper>
                <LeftSide>
                    <h2 style={{margin:'20px 0 15px 0'}}>Категории</h2>
                    <SelectCategory size="s" onChange={handleCategoryChange}/>
                </LeftSide>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f1f1f1',
                    padding: '0 10px',
                    justifyContent: 'center'
                }}>
                    <h2 style={{margin:'10px 0 15px 0'}}>Добавить расход</h2>
                    <InterestingInput
                        type="number"
                        placeholder="Сумма"
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(e.target.value)}
                    />
                    <InterestingInput
                        type="date"
                        placeholder="дата"
                        value={newExpenseDate}
                        onChange={(e) => setNewExpenseDate(e.target.value)}
                    />
                    <InterestingButton size="s" onClick={handleAddExpense}>
                        Добавить
                    </InterestingButton>
                </div>
                <RightSide>
                    <h2 style={{margin:'10px 0 15px 0'}}>Траты по категории: {selectedCategory}</h2>
                    <div style={{display: 'flex', flexDirection: 'column', height: '380px', overflowY: 'auto'}}>
                        {filteredExpenses.map((expense) => (
                            <div key={expense.id} style={{
                                width: 'calc(100% - 30px)',
                                backgroundColor: '#fff',
                                border: 'solid 1px #ccc',
                                borderRadius: '8px',
                                padding:'0 10px 10px 10px',
                                marginBottom:'10px'
                            }}>
                              <p style={{margin:"15px 0 5px"}}><b>Дата:</b> {expense.date}</p>
                                <p style={{margin:"10px 0 5px"}}><b>Сумма:</b> {expense.amount} руб.</p>
                                <p style={{margin:"10px 0 15px"}}><b>Категория:</b> {expense.category}</p>
                                <InterestingButton
                                    size="s"
                                    onClick={() => handleDeleteExpense(expense.id)}
                                >
                                    Удалить
                                </InterestingButton>
                            </div>
                        ))}
                    </div>
                </RightSide>
            </Wrapper>
        </PageContainer>
    );
};

export default ExpensesTracker;



