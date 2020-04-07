const listy2 = ["Alan", "Taylor", "Parrish"]
for (let i=0;i<3;i++){
    const names = prompt("enter a name")
    listy2.push(names)
}

for (let i=0; i<listy2.length;i++){
    console.log(listy2[i])
}