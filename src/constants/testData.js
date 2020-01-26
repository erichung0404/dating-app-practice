const DB = {
  profiles: [
    {
      surname: 'Lee', 
      middlename: '', 
      forename: 'Apple', 
      sex: 'male', 
      age: 26, 
      album: [
        require('../../assets/5dcc613f1f00009304dee539.jpeg'), 
        require('../../assets/Acute-Dog-Diarrhea-47066074.jpg'), 
        require('../../assets/1800x1200_great_dane_dog_drooling_other.jpg')
      ]
    }, 
    {
      surname: 'Wong', 
      middlename: '', 
      forename: 'banana', 
      sex: 'male', 
      age: 18, 
      album: [
        require('../../assets/Scottish-fold.png'),
        require('../../assets/adult-homeless-cat-asking-for-food-picture-id847415388.jpg'), 
        require('../../assets/dog-451643.jpg'), 
        require('../../assets/5dcc613f1f00009304dee539.jpeg'), 
        require('../../assets/images.jpeg')
      ]
    }, 
    {
      surname: 'Hong', 
      middlename: 'Lisa', 
      forename: 'Ming', 
      age: 20, 
      album: [
        require('../../assets/adult-homeless-cat-asking-for-food-picture-id847415388.jpg')
      ]
    }, 
    {
      surname: 'Lee', 
      middlename: '', 
      forename: 'Apple', 
      sex: 'male', 
      age: 26, 
      album: [
        require('../../assets/5dcc613f1f00009304dee539.jpeg'), 
        require('../../assets/Acute-Dog-Diarrhea-47066074.jpg'), 
        require('../../assets/1800x1200_great_dane_dog_drooling_other.jpg')
      ]
    }, 
    {
      surname: 'Lee', 
      middlename: '', 
      forename: 'Apple', 
      sex: 'male', 
      age: 26, 
      album: [
        require('../../assets/5dcc613f1f00009304dee539.jpeg'), 
        require('../../assets/Acute-Dog-Diarrhea-47066074.jpg'), 
        require('../../assets/1800x1200_great_dane_dog_drooling_other.jpg')
      ]
    }, 
  ], 
  settings: [
    {
      id: 1, 
      Phone: '12345678', 
      Email: 'abcde@gmail.com', 
      'Max Distance': 30, 
      'Show Me': 'Male', 
      Age: '18-40', 
      'Show Me on App': 'true', 
      'Push Notification': 'true'
    }, 
    {
      id: 2, 
      Phone: '1209878', 
      Email: 'dcbae@gmail.com', 
      'Max Distance': 50, 
      'Show Me': 'All', 
      Age: '28-40', 
      'Show Me on App': 'true', 
      'Push Notification': 'true'
    }, 
    {
      id: 3, 
      Phone: '1234908', 
      Email: 'eric@gmail.com', 
      'Max Distance': 30, 
      'Show Me': 'Female', 
      Age: '38-40', 
      'Show Me on App': 'true', 
      'Push Notification': 'false'
    }
  ]
}

class Server {
  constructor(db) {
    this.db = db; 
  }

  getMatchedProfiles = (id, n) => {
    // run machine learning algorithm
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const profiles = this.db.profiles.slice(0, n); 
        if(profiles) {
          resolve(profiles); 
        } else {
          reject(new Error(`Could not handle this request with id: ${id}`)); 
        }
      }, 1000)
    }); 
  }

  getSettings = id => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const settings = this.db.settings.filter(user=>user.id===id)[0]; 
        if(settings) {
          resolve(settings); 
        } else {
          reject(new Error(`Could not handle this request with id: ${id}`)); 
        }
      }, 3000)
    })
  }
}


export const server = new Server(DB); 