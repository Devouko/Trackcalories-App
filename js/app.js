class CaloriesTracker{

    constructor (){
        this._caloriesLimit=Storage.getCaloriesLimit()
        this._totalCalories=Storage.getCaloriesTotal()
        this._meal=Storage.getMeals()
        this._workouts=Storage.getWorkouts()
        this._displayCaloriesConsumed()
        this._displayCaloriesRemaining()
        this._displayCaloriesBurned()
        this._displayCaloriesLimit()
        this._displayCaloriesTotal( )
        this._displayProgress()
        document.getElementById('limit').value=this._caloriesLimit
    }
    //public methods/ Apis

    addMeal(meal){
this._meal.push(meal)
this._displayNewMeal(meal)
Storage.saveMeal(meal)
this._totalCalories +=meal.calories

Storage.updateTotalCalories(this._totalCalories)
this._render()
    }

    addWorkouts(workout){
this._workouts.push(workout)
this._totalCalories -=workout.calories
Storage.saveWorkout(workout)
Storage.updateTotalCalories(this._totalCalories)
this._displayNewWorkout(workout)
this._render()
    }
    removeMeal(id) {
        const index = this._meal.findIndex((meal) => meal.id === id);
        if (index !== -1) {
          const meal = this._meal[index];
          this._meal.splice(index, 1);
          this._totalCalories -= meal.calories;
          Storage.updateTotalCalories(this._totalCalories)
            Storage.removeMeal(id)
          this._render();
        }
      }
    
      removeWorkout(id) {
        const index = this._workouts.findIndex((workout) => workout.id === id);
        if (index !== -1) {
          const workout = this._workouts[index];
          this._workouts.splice(index, 1);
          this._totalCalories += workout.calories;
          Storage.updateTotalCalories(this._totalCalories)
          Storage.removeWorkout(id)
          this._render();
        }
      }
      reset(){
        this._totalCalories=0
        this._meal=[]
        this._workouts=[]
        this._render()
        Storage.clearAll()

      }

      setLimit(caloriesLimit){
        this._caloriesLimit=caloriesLimit
        Storage.setCaloriesLimit(caloriesLimit)
        this._displayCaloriesLimit()
        this._render()

      }
      loadItem(){
        this._meal.forEach(meal=>this._displayNewMeal(meal))
        this._workouts.forEach(workout=>this._displayNewWorkout(workout))
      }

    //private methods
//displays CaloriesTotal
    _displayCaloriesTotal(){
        const totalCalories=document.getElementById('calories-total')
        totalCalories.innerHTML=this._totalCalories

    }
    //displays CaloriesLimit

    _displayCaloriesLimit(){
        const totalCalories=document.getElementById('calories-limit')
        totalCalories.innerHTML=this._caloriesLimit

    }

_displayCaloriesRemaining(){
    const displayCaloriesRemainingEL=document.getElementById('calories-remaining')
    const remaining=this._caloriesLimit-this._totalCalories

    const progressEl=document.getElementById('calorie-progress')
    

    displayCaloriesRemainingEL.innerHTML=remaining
if(remaining<0){
displayCaloriesRemainingEL.parentElement.parentElement.classList.remove('bg-light')
displayCaloriesRemainingEL.parentElement.parentElement.classList.add('bg-danger')
progressEl.classList.remove('bg-success')
progressEl.classList.add('bg-danger')

}else{
    displayCaloriesRemainingEL.parentElement.parentElement.classList.remove('bg-danger')
displayCaloriesRemainingEL.parentElement.parentElement.classList.add('bg-light')

progressEl.classList.remove('bg-danger')
progressEl.classList.add('bg-success')

}




}

    _displayCaloriesConsumed(){
        const totalCaloriesConsumedEl=document.getElementById('calories-consumed')
        const totalCaloriesConsumed=this._meal.reduce((total,meal)=>total + meal.calories,0)

        console.log(totalCaloriesConsumed)
        totalCaloriesConsumedEl.innerHTML=totalCaloriesConsumed

    }
    _displayCaloriesBurned(){
        const totalCaloriesBurnedEl=document.getElementById('calories-burned')
        const totalCaloriesBurned=this._workouts.reduce((total,workout)=>total + workout.calories,0)

        console.log(totalCaloriesBurned)
        totalCaloriesBurnedEl.innerHTML=totalCaloriesBurned

    }
    _displayProgress(){
        const progressEl=document.getElementById('calorie-progress')
        const percentage=(this._totalCalories/this._caloriesLimit)*100

        const width=Math.min(percentage,100)
        console.log(width)

        progressEl.style.width=`${width}%`


    }
    _displayNewMeal(meal){

        const mealsEl=document.getElementById('meal-items')

        const mealEl=document.createElement('div')
        mealEl.classList.add('card','my-2')
        mealEl.setAttribute('data-id',meal.id)
        mealEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${meal.name}</h4>
        <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
          ${meal.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
  </div>
    `;
    mealsEl.appendChild(mealEl)
    }
    _displayNewWorkout(workout) {
        const workoutsEl = document.getElementById('workout-items');
        const workoutEl = document.createElement('div');
        workoutEl.classList.add('card', 'my-2');
        workoutEl.setAttribute('data-id', workout.id);
        workoutEl.innerHTML = `
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between">
            <h4 class="mx-1">${workout.name}</h4>
            <div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
              ${workout.calories}
            </div>
            <button class="delete btn btn-danger btn-sm mx-2">
              <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
      </div>
        `;
        workoutsEl.appendChild(workoutEl);
      }




    _render(){

        this._displayProgress()
        this._displayCaloriesTotal()
        this._displayCaloriesConsumed()
        this._displayCaloriesBurned()
        this._displayCaloriesRemaining()
    }
}
class Meal{
    constructor(name,calories){
        this.id=Math.random().toString(16).slice(2)
        this.name=name
        this.calories=calories
    }
   
}
class Workout{
    constructor(name,calories){
        this.id=Math.random().toString(16).slice(2)
        this.name=name
        this.calories=calories
    }
   
}
class Storage{
    static getCaloriesLimit(defaultCalories=2000){
        let caloriesLimit;
        if(localStorage.getItem('caloriesLimit')===null){
            caloriesLimit=defaultCalories
        }else{
            caloriesLimit=+localStorage.getItem('caloriesLimit')
        }
        return caloriesLimit
    }
    static setCaloriesLimit(caloriesLimit){
        localStorage.setItem('caloriesLimit',caloriesLimit)
    }
    static getCaloriesTotal(defaultCalories=0){
        let CaloriesTotal;
        if(localStorage.getItem('totalCalories')===null){
            CaloriesTotal=defaultCalories
        }else{
            CaloriesTotal=+localStorage.getItem('totalCalories')
        }
        return CaloriesTotal
    }
    static updateTotalCalories(calories){
        localStorage.setItem('totalCalories',calories)
    }
    

static getMeals(){
    let meals;
    if(localStorage.getItem('meals')===null){
        meals=[]
    }else{
        meals=JSON.parse(localStorage.getItem('meals'))
    }
    return meals
}
static saveMeal(meal){
    const meals=Storage.getMeals()
    meals.push(meal)
    localStorage.setItem('meals',JSON.stringify(meals))

}
static removeMeal(id){
const meals=Storage.getMeals()
meals.forEach((meal,index)=>{
    if(meal.id===id){
        meals.splice(index,1)
    }
})
localStorage.setItem('meal',JSON.stringify(meals))

}



static getWorkouts(){
    let workouts;
    if(localStorage.getItem('workouts')===null){
        workouts=[]
    }else{
        workouts=JSON.parse(localStorage.getItem('workouts'))
    }
    return workouts
}
static saveWorkout(workout){
    const workouts=Storage.getWorkouts()
    workouts.push(workout)
    localStorage.setItem('workouts',JSON.stringify(workouts))

}

static removeWorkout(id){
    const workouts=Storage.getWorkouts()
    workouts.forEach((workout,index)=>{
        if(workout.id===id){
            workouts.splice(index,1)
        }
    })
    localStorage.setItem('workouts',JSON.stringify(workouts))
    
    }
static clearAll(){
localStorage.removeItem('totalCalories')
localStorage.removeItem('meals')
localStorage.removeItem('workouts')

    //if you want to remove the limit
    // localStorage.clear()
}



}





class App{
constructor(){
    this._tracker=new CaloriesTracker()
    this._loadEventListerners()
    this._tracker.loadItem()
}
    _loadEventListerners(){
    document.getElementById('meal-form').addEventListener('submit',this._newItem.bind(this, 'meal'))
    document.getElementById('workout-form').addEventListener('submit',this._newItem.bind(this, 'workout'))
    document
      .getElementById('workout-items')
      .addEventListener('click', this._removeItem.bind(this, 'workout'));
    document.getElementById('meal-items').addEventListener('click',this._removeItem.bind(this,'meal'))

    document.getElementById('filter-meals').addEventListener('keyup', this._filterItems.bind(this,'meal'))
    document.getElementById('filter-workouts').addEventListener('keyup', this._filterItems.bind(this,'workout'))

    document.getElementById('reset').addEventListener('click',this._resetItem.bind(this))

    document.getElementById('limit-form').addEventListener('submit',this._setLimit.bind(this))
    
}
_newItem(type,e){
    e.preventDefault()

const name=document.getElementById(`${type}-name`)
const calories=document.getElementById(`${type}-calories`)

//validation
if(name.value==='' || calories.value===''){
    alert('please fill all the fields')
    return;
}
if(type ==='meal'){

    const meal =new Meal(name.value, +calories.value)
    this._tracker.addMeal(meal)
}else{
    const workout =new Workout(name.value, +calories.value)
    this._tracker.addWorkouts(workout)
}


name.value=''
calories.value=''
const collapseEl=document.getElementById(`collapse-${type}`)
const bsCollapse=new bootstrap.Collapse(collapseEl,{
    toggle : true
})

}
_removeItem(type,e){
    if(e.target.classList.contains('delete')||
    (e.target.classList.contains('fa-xmark'))
    ){
        if(confirm('Are you sure?')){
            // console.log('delete')
            const id=e.target.closest('.card').getAttribute('data-id')
            // console.log(id)

            type==='meal' ? this._tracker.removeMeal(id) : this._tracker.removeWorkout(id)
            e.target.closest('.card').remove()


        }
    }

}
_filterItems(type,e){
    const text=e.target.value.toLowerCase()
    console.log(text)

    document.querySelectorAll(`#${type}-items .card`).forEach(item =>{

        const name=item.firstElementChild.firstElementChild.textContent
        console.log(name)

        if(name.toLowerCase().indexOf(text) !==-1){
            item.style.display='block'
        }else
        item.style.display='none'
    })
}
_resetItem(){
    this._tracker.reset()
    document.getElementById('meal-items').innerHTML=''
    document.getElementById('workout-items').innerHTML=''
    document.getElementById('filter-meals').value=''
    document.getElementById('filter-workouts').value=''
}
_setLimit(e){
    e.preventDefault()
    const limit=document.getElementById('limit')

    if(limit.value===''){
        alert('please Add a limit')
        return
    }
    this._tracker.setLimit(+limit.value)
    limit.value=''

    const modalEl=document.getElementById('limit-modal')
    const modal=bootstrap.Modal.getInstance(modalEl)
    modal.hide()
}



}
const app=new App()






// console.log(Math.random().toString(16).slice(2))
// const tracker =new CaloriesTracker()

// const breakfast=new Meal('breakfast',600)
// tracker.addMeal(breakfast)

// const workout=new Workout('push ups',300)
// tracker.addWorkouts(workout)

// console.log(tracker._meal)
// console.log(tracker._workouts)
// console.log(tracker._totalCalories)
