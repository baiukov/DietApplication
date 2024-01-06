$("#age").text("started")
document.getElementById("age").innerText  = "stated"
$('#submit').click( () => {
        const data = $("ageInput").val()
        console.log(data)
        AndroidInterface.sendDataToAndroid(data)
    }
)