

const log = new LogoutButton();

log.action = () =>{
    ApiConnector.logout((response) => {
    if (response.success){
        location.reload();
    }
});
};

ApiConnector.current((response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
    }
  });


const rates = new RatesBoard();

ApiConnector.getStocks ((response) => {
    if(response.success){
            rates.clearTable();
            rates.fillTable(response.data);
        }
    });

setInterval (getStocks,60000)
 

const money = new MoneyManager();

money.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data,(response) =>{
        if(response.success){
            ProfileWidget.showProfile(response.data);
            money.setMessage(true,"Пополнение баланса")
        } else {
            money.setMessage(false,response.error);
        }
    });
}



money.conversionMoneyCallback = (data) =>{
    ApiConnector.convertMoney(data,(response) => {
        
        if(response.success){
           ProfileWidget.showProfile(response.data);
           money.setMessage(true,"Конвертирование валют")
        } else{
           money.setMessage(false, response.error)
        }
    });

}

money.sendMoneyCallback = (data) =>{
 ApiConnector.transferMoney(data, (response) =>{
    if(response.success){
        ProfileWidget.showProfile(response.data);
        money.setMessage(true,"перевод валюты");
    } else {
        money.setMessage(false, response.error)
    }

});
}


const favorit = new FavoritesWidget();


    ApiConnector.getFavorites ((response) =>{
        if(response.success){
            favorit.clearTable();
            favorit.fillTable(response.data);
            money.updateUsersList(resronse.data);
        } 

    });

favorit.addUserCallback = (data) =>{
    ApiConnector.addUserToFavorites (data, (response) =>{
        if(response.success){
            favorit.clearTable();
            favorit.fillTable(response.data);
            money.updateUsersList(response.data);
            money.setMessage(true,"Добавлено в список избранного");
        } else{
            money.setMessage(false, response.error);
        }

    });
}

favorit.removeUserCallback = (data) =>{
    ApiConnector.removeUserFromFavorites(data, (response) =>{
            if(response.success){
                favorit.clearTable();
                favorit.fillTable(response.data);
                money.updateUsersList(response.data);
                money.setMessage(true,"удаление из избранного");
            } else{
                money.setMessage(false, response.error);
            }
    
        });
}