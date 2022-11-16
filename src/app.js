
// App = {
//     loading:false,
//     contracts: {},
//     load: async ()=>{
//         //Load app...
//         await App.loadWeb3()
//         await App.loadAccount()
//         await App.loadContract()
//         console.log("app loading...");
//         await App.render()
//         await App.createTask()
        
//     },

//  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
//   loadWeb3: async () => {
//     if (typeof web3 !== 'undefined') {
//       App.web3Provider = web3.currentProvider
//       web3 = new Web3(web3.currentProvider)
//     } else {
//       window.alert("Please connect to Metamask.")
//     }
//     // Modern dapp browsers...
//     if (window.ethereum) {
//       window.web3 = new Web3(ethereum)
//       try {
//         // Request account access if needed
//         await ethereum.enable()
//         // Acccounts now exposed
//         web3.eth.sendTransaction({/* ... */})
//       } catch (error) {
//         // User denied account access...
//       }
//     }
//     // Legacy dapp browsers...
//     else if (window.web3) {
//       App.web3Provider = web3.currentProvider
//       window.web3 = new Web3(web3.currentProvider)
//       // Acccounts always exposed
//       web3.eth.sendTransaction({/* ... */})
//     }
//     // Non-dapp browsers...
//     else {
//       console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
//     }
//   },

//   loadAccount: async () => {
//     // Set the current blockchain account
//     // console.log(    web3.eth.getAccounts().then( function (result) { return result[0] })
//     // );
//     // App.accounts = web3.eth.getAccounts()
//     // console.log(App.accounts[0]);
    
//     // App.accounts = web3.eth.getAccounts().then(e => console.log(e[0]));
//     App.accounts = await web3.eth.getAccounts()
//     console.log(App.accounts[0]);
    
//   },

//   loadContract: async ()=> {
//     const cert = await $.getJSON('Cert.json')
//     App.contracts.Cert  = TruffleContract(cert);
//     App.contracts.Cert.setProvider(App.web3Provider);
    
//     // console.log(cert);

//     App.cert = await App.contracts.Cert.deployed()
    

//   },

//   render: async ()=> {
//     // Render Account 
//     if(App.loading){
//         return;
//     }
//     App.setLoading(true)
//     $('#account').html(App.accounts[0])
//     // await App.renderTasks()
//     App.setLoading(false)
//   },


//   renderTasks: async() => {
//     // Load the total task count from the blockchain 
//     const tcount = await App.cert.count()
//     const $taskTemplate = $('.taskTemplate')

//     // Render out each task with a new task template
//     for(var i=1; i<=tcount; i++){
//         const task = await App.cert.tasks(i);
//         const taskId = task[0].toNumber()
//         const taskContent = task[1];
//         const taskCompleted = task[2]

//         // Create the html for the task
//         const $newTaskTemplate = $taskTemplate.clone()
//         $newTaskTemplate.find('.content').html(taskContent)
//         $newTaskTemplate.find('input')
//                         .prop('name', taskId)
//                         .prop('checked', taskCompleted)
//                         // .on('click', App.toggleCompleted)
//         // Put the task in the correct list
//         if (taskCompleted) {
//         $('#completedTaskList').append($newTaskTemplate)
//         } else {
//         $('#taskList').append($newTaskTemplate)
//         }

//         // show the task on the page 

//         $newTaskTemplate.show();

//     }
    
//   },

//   createTask: async ()=> {
//     App.setLoading(true)
//     const hashval = $('#hashval').val();
//     const name = $('#namee').val()
//     const course = $('#coursee').val()
//     const issuer  = $('#issuerr').val()
//     const date = $('#datee').val()
//     console.log(App.accounts[0])
//     // await App.cert.createTask(content)
//     await App.cert.createTask(hashval, name, course, issuer, date,{ from:  App.accounts[0]})
//     // window.location.reload()
//     // res.send("Hello world");
//     console.log(hashval);
//     console.log(name);
//     console.log(course);
//     console.log(issuer);
//     console.log(date);

//   },
 
//   validateTask: async ()=> {
//     // App.setLoading(true)
//     const hashval = $('#hashvalV').val();
    
//     // await App.cert.createTask(content)
//     // const c = await App.cert.tasks(hashval);
//     if(c.exists)
//     {
//       console.log(c);
//     }
//     else
//     {
//       console.log("Doest not exists");
//     }

//     // window.location.reload()
//     // res.send("Hello world");
//     // console.log(hashval);
//     // console.log(name);
//     // console.log(course);
//     // console.log(issuer);
//     // console.log(date);

//   },

//   setLoading: (boolean) => {
//     App.loading = boolean
//     const loader = $('#loader')
//     const content = $('#content')
//     if (boolean) {
//       loader.show()
//       content.hide()
//     } else {
//       loader.hide()
//       content.show()
//     }
//   },
  
//   dummy: async()=>{
//     console.log("I am dummy");
//   }

// }



// $(() => {
//     $(window).load(() => {
//         App.load()
//     })
// })

// // module.exports = { App }









App = {
  loading:false,
  contracts: {},
  load: async ()=>{
      //Load app...
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()

      console.log("app loading...");
  },

// https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
loadWeb3: async () => {
  if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider
    web3 = new Web3(web3.currentProvider)
  } else {
    window.alert("Please connect to Metamask.")
  }
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum)
    try {
      // Request account access if needed
      await ethereum.enable()
      // Acccounts now exposed
      web3.eth.sendTransaction({/* ... */})
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    App.web3Provider = web3.currentProvider
    window.web3 = new Web3(web3.currentProvider)
    // Acccounts always exposed
    web3.eth.sendTransaction({/* ... */})
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
},

loadAccount: async () => {
  // Set the current blockchain account
  // console.log(    web3.eth.getAccounts().then( function (result) { return result[0] })
  // );
  // App.accounts = web3.eth.getAccounts()
  // console.log(App.accounts[0]);
  
  // App.accounts = web3.eth.getAccounts().then(e => console.log(e[0]));
  App.accounts = await web3.eth.getAccounts()
  console.log(App.accounts[0]);
  
},

loadContract: async ()=> {
  const cert = await $.getJSON('Cert.json')
  App.contracts.Cert  = TruffleContract(cert);
  App.contracts.Cert.setProvider(App.web3Provider);
  
  // console.log(cert);

  App.cert = await App.contracts.Cert.deployed()
  

},

render: async ()=> {
  // Render Account 
  if(App.loading){
      return;
  }
  App.setLoading(true)
  $('#account').html(App.accounts[0])
  // await App.renderTasks()
  App.setLoading(false)
},


renderTasks: async() => {
  // Load the total task count from the blockchain 
  const tcount = await App.cert.count()
  const $taskTemplate = $('.taskTemplate')

  // Render out each task with a new task template
  for(var i=1; i<=tcount; i++){
      const task = await App.cert.tasks(i);
      const taskId = task[0].toNumber()
      const taskContent = task[1];
      const taskCompleted = task[2]

      // Create the html for the task
      const $newTaskTemplate = $taskTemplate.clone()
      $newTaskTemplate.find('.content').html(taskContent)
      $newTaskTemplate.find('input')
                      .prop('name', taskId)
                      .prop('checked', taskCompleted)
                      // .on('click', App.toggleCompleted)
      // Put the task in the correct list
      if (taskCompleted) {
      $('#completedTaskList').append($newTaskTemplate)
      } else {
      $('#taskList').append($newTaskTemplate)
      }

      // show the task on the page 

      $newTaskTemplate.show();

  }
  
},

createTask: async ()=> {
  App.setLoading(true)

    const hashval = $('#hashval').val();
    const name = $('#namee').val()
    const course = $('#coursee').val()
    const issuer  = $('#issuerr').val()
    const date = $('#datee').val()
    console.log(App.accounts[0])
    // await App.cert.createTask(content)
    await App.cert.createTask(hashval, name, course, issuer, date,{ from:  App.accounts[0]})
    // window.location.reload()
    // res.send("Hello world");
    console.log(hashval);
    console.log(name);
    console.log(course);
    console.log(issuer);
    console.log(date);

  // await App.cert.createTask(content, {from: App.accounts[0]})
  window.location.reload()
},
validateTask: async ()=> {
  App.setLoading(true)

    const hashval = $('#hashvalV').val();
    
    console.log(App.accounts[0])
    // await App.cert.createTask(content)
    const task = await App.cert.tasks(hashval);
    // window.location.reload()
    // res.send("Hello world");
    // console.log(cft)
    const id = task[0].toNumber()
    const hashV = task[1]
    const name = task[2]
    const course = task[3]
    const issuer = task[4];
    const date = task[5];
    const exists = task[6];

    
    if(exists)
    {
      console.log("id"+id);
      console.log("hash"+hashV);
      console.log("name"+name);
      console.log("course"+course);
      console.log("issuer"+issuer);
      console.log("date"+date);
      console.log("exist"+exists);

      $('#nameV').html(name)
      $('#courseV').html(course)
      $('#issuerV').html(issuer)
      $('#dateV').html(date)
      // document.getElementById('nameV').value(name);

    }
    else
    {
      $('#nameV').html("Doest not exists");
      $('#courseV').html("")
      $('#issuerV').html("")
      $('#dateV').html("")
      console.log("Doest not exists");
    }
    console.log(hashval);
    
  // await App.cert.createTask(content, {from: App.accounts[0]})
  // window.location.reload()
},



setLoading: (boolean) => {
  App.loading = boolean
  const loader = $('#loader')
  const content = $('#content')
  if (boolean) {
    loader.show()
    content.hide()
  } else {
    loader.hide()
    content.show()
  }
}

}



$(() => {
  $(window).load(() => {
      App.load()
  })
})
