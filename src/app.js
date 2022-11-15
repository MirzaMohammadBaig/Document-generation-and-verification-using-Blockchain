
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
    await App.renderTasks()
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
    const content = $('#newTask').val()
    // await App.cert.createTask(content)
    await App.cert.createTask(content, {from: App.accounts[0]})
    window.location.reload()
    // res.send("Hello world");
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

module.exports(App)