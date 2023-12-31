import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Text,
} from 'native-base';
import {reminderList} from './data/reminder'
import {
  ScheduledAlarmNotification,
  CancelNotification, 
  DailyRemind,
} from './components/PushController'

/* transform React Date() format to dd-mm-yyyy */
export function getDateString(){
  const date = new Date();
  var zD = (date.getDate() < 10 ? '0' : '')
  var zM = (date.getMonth()+1<10 ? '0' : '')
  const dateString = zD + date.getDate() + '-' + zM + (date.getMonth()+1) + '-' + date.getFullYear();
  return dateString;
}


export function addAlarmNoti(activity){
  var i
  let rep = activity.repeat
  for (i = 0; i < 7; i++) {
    if (rep[i].value === true){
      ScheduledAlarmNotification(activity, i)
    }
  }
}

export function removeAlarmNoti(activity){
  var i;
  let rep = activity.repeat
  for (i = 0; i < 7; i++) {
    if (rep[i].value === true){
      index = activity.id*10 + i
      CancelNotification(index);
      index = activity.id * 10 + i
      CancelNotification(index)
    }
  }
}

/* looping through filter list to see if the item does match */
export function checkFilter(name, filterList) {
  let res = false;
  filterList.map(item => {
    if (item.name === name && item.checked === true) {res = true;}
  })
  return res;
};

/* Initialize all reminders and suggestion for user daily (called when register/ reset notif) */
export function initializeReminders(){
  reminderList.map(reminder => {
    DailyRemind(reminder)
  })
}

export function removeReminders(){
  reminderList.map(reminder => {
    CancelNotification(reminder.id)
  })
}

/* Simple rating on user health and finance */
export function rateHealth(userInfo){
  coef = Math.abs(userInfo.Measure.BMI - 22)
  if (coef < 4) return 0.8 + (4 - coef)/20.0;
  else if (coef < 8) return 0.3 + (8 - coef)/8.0;
  else return 0.2;
}

export function rateFinance(Finance, money){
  earned = Finance.earned.sum; spent = Finance.spent.sum;
  diff = earned - spent;
  rate = 0.5 + (diff/money)
  if (rate < 0) return 0.0; else if (rate > 1) return 1.0;
  else return rate;
}

/* Return simple advice based on user info */
export function fitnessAnalyzer(Record, Today){
  const waterCount = (water) => {
    if (water < 0.5) 
      return <Text style = {styles.script}>Your water consumption is dangerously low today!
        remember to fill in at least 2 litre of water (including in food) for a decent hydration</Text>
    if (water < 2.0)
      return <Text style = {styles.script}>It seems you are not drinking enough water.
        Try to fill in {2.0 - water}L more today to achieve better hydration!</Text>
    if (water < 3.0)
      return <Text style = {styles.script}>Your water consumption is good today!</Text>
    return <Text style = {styles.script}>You are possibly drinking to much water! Try to lower your daily
      HydroDioxide consumption to avoid water intoxication.</Text>
  }

  const energyCons = (consumed, burned) => {
    if (consumed - burned > 1500)
      return <Text style = {styles.script}>You are consuming more than your body burns! Try
        balancing your diet and exercise more.</Text>
    if (consumed - burned < 1000)
      return <Text style = {styles.script}>You are not accumulating enough energy for body
        function! Try to consume more calories to match your active level.</Text>    

      return <Text style = {styles.script}>Your energy balance is generally good for metabolism!
        Try to consistently keep this progress to match your goal.</Text>  
  }

  const exercise = (time) => {
    if (time < 30)
      return <Text style = {styles.script}>Also, please consider exercising a little bit more each day
        to maintain a fresh condition. Even 30 minutes of light jogging is enough.</Text>
    if (time > 120)
      return <Text style = {styles.script}>It looks like you are enjoying workouts really fondly. However,
        note that overexercising can cause exhaustion and side effects, so do it at a maintainable rate.</Text>
      return <Text style = {styles.script}>Good job with your exercise today! Let's hope you could improve
        your workrate and duration tomorrow.</Text> 
  }

  const overall = (todays) => {
    return <Text style = {styles.script}>You are in good health today!</Text>
  }

  return(
    <View>
      {overall(Today)}
      {waterCount(Today.waterConsumed)}
      {energyCons(Today.energyConsumed, Today.energyBurned)}
    </View>
  )
}

/* Return simple financial advice on user budget */
export function financeAnalyzer(money, Today){
  const checkBalance = (spent, earned) => {
    if (spent - earned > 50000) 
      return <Text style = {styles.script}>You are spending more than your wallet can afford.
        Consider saving more the upcoming days.</Text>
    if (spent - earned < -50000) 
      return <Text style = {styles.script}>You have earned good bits of fortune today! Keep 
       up the good work for about {Math.floor(1000000000/(earned-spent)) /*gap*/} days and you'll be a billionaire.</Text>  
 
    return <Text style = {styles.script}>Your financial record today is in acceptable range.</Text>    

  }

  const checkAccount = (money) => {
    if (money < -1000000)
      return <Text style = {styles.script}>Your financial situation is abysmal! Save some money
        for a better future.</Text>
    if (money > 1000000)
      return <Text style = {styles.script}>About the account overview? What can I say except S.T.O.N.K?</Text>
    return <Text style = {styles.script}>You are overall in good term with your wallet.</Text>
  }

  return(
    <View>
      {checkBalance(Today.spent.sum, Today.earned.sum)}
      {checkAccount(money)}
    </View>
  )
}

/* Present warning on outliers or unusual record */
export function warningPresent(info, measure){

  var bmi = true;
  var height = true;
  var age = true;

  if (measure.BMI > 30)
  return <Text style = {styles.script}>You are likely suffering from obesity. This disease
    is crucial to note for your age, as it can lead to a lot of complications in later stages</Text>
  if (measure.BMI < 17)
  return <Text style = {styles.script}>Your BMI is dangerously low. It could be the sign of 
    malnutrition and decreasing health. Look out more for your health!</Text>
  return <Text style = {styles.script}>There is no warning today! Keep up the good work.</Text>

}


const styles = StyleSheet.create({
  script: {
    fontSize: 18,
    paddingTop: 5,
    marginBottom: 5,
  }
})