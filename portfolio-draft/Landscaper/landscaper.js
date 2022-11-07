/////////////Items Array////////////

const items = [
    {
        name: 'Your teeth',
        cost: 0,
        value: 1
    },
    {
        name: 'Scissors',
        cost: 5,
        value: 5
    },
    {
        name: 'Old-Timey Push Mower',
        cost: 25,
        value: 50,
    },
    {
        name: 'Fancy Battery-Powered Lawnmower',
        cost: 250,
        value: 100
    },
    {
        name: 'Team of Starving Students',
        cost: 500,
        value: 250
    }
]
let wallet = 1
let playerInventory = [
    items[0]
]

////////LETS MOW SOME GRASS////////////

$( () => {
    // global condition that is always holding the tool we are currently using
    let selectedTool = ""

    // condition to prevent the shop button from being spammed
    let shopOpened = false
    
    const currentTool = (e) => {
        let $target = $(e.target)
        $('.tools').removeClass('selected')
        $target.addClass('selected')
        // console.log($target)
        selectedTool = $target.text()
        // console.log(selectedTool)
    }

    const earnMoney = (selectedTool) => {
        let tool = ""
        for (let item of playerInventory){
            if(item.name == selectedTool){
                tool = item
            }
        }
        let $text = $('<p>').text(`You mowed the grass all day and earned ${tool.value}`)
        wallet += tool.value
        $('#wallets').text(wallet)
        mowMoneymowProblems()
    }

    const newInventoryItem = (item) => {
        return $('<li>').addClass('tools').text(`${item.name}`)       
    }

    const showInventory = () => {
        for (let i = 0; i < playerInventory.length; i++){
            let $inventoryItem = newInventoryItem(playerInventory[i])
            $('#inventory-list').append($inventoryItem)
        }
    }

    const addPicture = () => {
        $('#picture').remove()
        let $imageHold = $('<img>').attr({
            src: './mower-1.jpeg',
            id: 'picture'
            
        })
        $('#image').append($imageHold)

        // $imageHold.css('background-image','url("./mower-1.jpeg')
    }

    const addPictureStore = () => {
        $('#picture').remove()
        let $imageHold = $('<img>').attr({
            src: './hardware-man.jpg',
            id: 'picture'
        })
        $('#image').append($imageHold)
    }

    ///////////LETS SHOP///////////////

    const createShopList = (item) => {
        let $div = $('<div>').addClass('flex-container')
        let $li = $('<li>').addClass('shop-item').text(item.name)
        let $cost = $('<button>').text(item.cost).addClass('buy-buttons')
        $cost.on('click', (e) => {
            purchaseFunction(e)
        })
        $div.append($li, $cost)
        return $div
    }

    const hardwareStore = () => {
        let $closeButton = $('<button>').addClass('close-button').text('close')
        let $div = $('<div>').addClass('shop-div')
        for (let i = 0; i < items.length; i++){
            $div.append(createShopList(items[i]))
        }
        $('body').append($div)
        $div.append($closeButton)
    }

    const closeShop = (e) => {
        let $target = $(e.target)
        if ($target.hasClass('close-button')){
            $('.shop-div').remove()
        }
        
        shopOpened == false

    }

    const purchaseFunction = (e) => {
        let $buy = $(e.target)
        let $cost = Number($buy.text())
        if ($cost <= wallet){
            $('#inventory-list').empty()
            pushItems($cost)
            showInventory()
        } else { 
            alert(`You don't have enough money!`)
        }
    
    }

    const pushItems = (itemCost) => {
        let $item = ''
        for (i = 0; i < items.length; i++){
            if (items[i].cost == itemCost){
                $item = items[i]
            }
        }
        playerInventory.push($item)
    }


    /////////////WIN CONDITIONS/////////////

    const mowMoneymowProblems = () => {
        if(wallet >= 1000){
            for(let obj of playerInventory){
                if(obj.name === 'Team of Starving Students'){
                    alert('Congrats you won!')
                    location.reload()
                }
            }
        }
    }

    const retireNow = () => {
        alert('It is too bad that you gave up. Play again next time!')
        location.reload()
    }


    ///////////////EVENT HANDLERS///////////////

    // when something in your inventory is clicked addClass selected to that element.
    $('#inventory-list').on('click', (e) => {
        currentTool(e)
        $('#text').append($('<p>').text('You swapped tools'))
    })


    // when the mow button is clicked 
    $('#mow').on('click', (e) => {
        if ($('#inventory-list').children().hasClass('selected')){
        earnMoney(selectedTool)

        $('#text').append($('<p>').text('You earned some money!'))
        }

        addPicture()
    })

    // on windowload populate inventory with items
    $(() => {
        showInventory()
        $('#wallets').text(`${wallet}`)
    }) 

    // when shop button is clicked open store
    $('#shop').on('click',() => {
        if (shopOpened == false){
            hardwareStore()
            shopOpened == true
        $('#text').append($('<p>').text('What are ya buyin?'))
        }
        
        addPictureStore()
    })

    // when anywhere on the body is clicked run the closeShop function
    $('body').on('click',(e) => {
        closeShop(e)
    } )

    // when the retire button is clicked refresh page.
    $('#retire').on('click', retireNow)
})