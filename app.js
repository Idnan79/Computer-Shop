const laptopsElement = document.getElementById("laptops");
const loanElement = document.getElementById("GetLoan");
const balanceElement = document.getElementById("balance");
const WorkElement = document.getElementById("Work");
const payButtonElement = document.getElementById("Pay");
const specsElement = document.getElementById("specs");
const buyElement = document.getElementById("Pay");
const priceElement = document.getElementById("price");
const imageElement = document.getElementById("image");
const BankElement = document.getElementById("Bank");
const titleElement = document.getElementById("title");
const descriptionElement = document.getElementById("description");
const totalDueElement = document.getElementById("totalDue");
const ClearLoanElement = document.getElementById("ClearLoan");
const outstandingElement = document.getElementById("outstanding");
const outstandingLoanButtonElement = document.getElementById("outstandingLoanButton");

let laptops = [];
let Work =0.0;
let BankBalance=200;
let totalDue = 0.0;
const cur = ' Kr'; 
let count = 0;
let comison= 0.0;
let interstedAmountOfLoan =0.0;
let selectedLaptop = 0;


fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
.then(response => response.json())
.then(data => laptops = data)
.then(laptops => addlaptopsToMenu(laptops));
const addlaptopsToMenu = (laptops) => {
    laptops.forEach(x => addlaptopToMenu(x));
    specsElement.innerText = laptops[0].specs;
    priceElement.innerText = laptops[0].price + cur;
    totalDue=laptops[0].price;
    let linkImage ="https://noroff-komputer-store-api.herokuapp.com/"+laptops[0].image;
    imageElement.innerHTML =`<img src = "${linkImage}"width ="200" height= "100"/>`;
    imageElement["src"] = linkImage; 
    titleElement.innerText = laptops[0].title;
    descriptionElement.innerText = laptops[0].description;

}
const addlaptopToMenu = (laptop) => {
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);

}

const handlelaptopMenuChange = e => {
    const selectedlaptop = laptops[e.target.selectedIndex];
    specsElement.innerText = selectedlaptop.specs;
    
}

const handlelaptopMenuPrise = e => {
    const selectedlaptop = laptops[e.target.selectedIndex];
    priceElement.innerText = selectedlaptop.price + cur;
    selectedLaptop  = selectedlaptop.price;
    console.log(selectedLaptop);
    
    
}

const handlelaptopMenuImage = e => {
    const selectedlaptop = laptops[e.target.selectedIndex];
    let linkImage ="https://noroff-komputer-store-api.herokuapp.com/"+selectedlaptop.image;
    imageElement.innerHTML =`<img src = "${linkImage}/> height=45px width=50px`;
       imageElement["src"] = linkImage; 
     //linkImage =" ";
}

const handelItemTitle = e => {
    const selectedLaptop = laptop[e.target.selectedIndex];
    titleElement.innerText = selectedLaptop.title;

}
 
const handelWorkButton = e =>  {
    Work+= 100 ;
    WorkElement.innerText = Work + cur;
   
    
}
const handelBankButton = e => {
    
    if(count === 0){
    
     BankBalance += Work ;
    balanceElement.innerText =  BankBalance + cur;
    Work= 0.0;
    WorkElement.innerText = Work + cur;   
    }else if(count=== 1)
    {
     BankBalance -= Work * 0.1;
     comison += Work *0.1;
     Work= 0;
     const interest = 10;
     WorkElement.innerText = Work + cur;
    balanceElement.innerText =  BankBalance + cur;
    outstandingElement.innerText = "Outstanding loan:"+ comison  + cur; 
    if(comison === 0){
        count = 0;
        document.querySelector('#outstanding').style.display='none';
        document.querySelector('#outstandingLoanButton').style.display='none';
    }  
}
}

function handelBanAccount() {
   while(count === 0){
  
    comison = parseFloat(prompt("Please enter the amount of money you wish:"));
    if(Number.isNaN(comison))
    alert(" Enter a number");
          else if (comison > BankBalance )
    alert("You are not able to apply this amount! ");
          else{
        alert("Loan approved!");
       
       
        BankBalance += comison;
        balanceElement.innerText= BankBalance + cur;
        document.querySelector('#outstanding').style.display='inline';
        //document.getElementById(outstandingElement) .style.display ='inline';
        outstandingElement.innerText = comison + cur;
        document.querySelector('#outstandingLoanButton').style.display='inline'
         count++;
    }
}
}

    
    function handelRemaingLoan ( )  {
       
        if(comison > Work){
             comison = comison - Work;
             Work= 0;
            balanceElement.innerText =comison+ cur;
            outstandingElement.innerText =  "outstandingloan :"+comison +cur;
        
            document.querySelector('#outstanding').style.display= "none";
            WorkElement.innerText = Work;
            
        }
        if(comison <= Work){
            Work = Work - comison;
            document.querySelector('#outstanding').style.display= "none";
            document.querySelector('#outstandingLoanButton').style.display= "none";
            balanceElement.innerText = Work + cur;
            count = 0;
        }
        
    }
    
    const handelParchase = () => {
        
               if(BankBalance >= selectedLaptop){
                   BankBalance = BankBalance - selectedLaptop;
                   console.log(BankBalance);
                   console.log(selectedLaptop.price);
                   balanceElement.innerText = BankBalance + cur;
                    alert("you are now the owner of the new laptop!");
               } else
               alert(`You don't have so musch moneyfor this item!`);
              
                   console.log(selectedLaptop);
            }
        
              
laptopsElement.addEventListener("change",handlelaptopMenuChange);
laptopsElement.addEventListener("change",handlelaptopMenuPrise);
laptopsElement.addEventListener("change",handlelaptopMenuImage);
buyElement.addEventListener("click", handelParchase);
        
