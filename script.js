document.addEventListener('DOMContentLoaded', function(){
    const grossInput = document.getElementById('annualIncome');
    const errorIcon = document.getElementById('firstErrorIcon');

    const extraInput = document.getElementById('extraIncome');
    const extraErrorIcon = document.getElementById('secondErrorIcon');

    const deductionInput = document.getElementById('totalDeductions');
    const deductionErrorIcon = document.getElementById('lastErrorIcon');

    const displayError = (input, errorIcon, message) => {
        if(input.value !== '' && !/^\d+(\.\d+)?$/.test(input.value)){
            errorIcon.style.visibility = "visible";
            tippy(errorIcon, {
                content: message,
                placement: 'left',
                trigger: 'mouseenter focus',
            });
        }
        else{
            errorIcon.style.visibility = 'hidden';
        }
    };

    grossInput.addEventListener('input', () => {
        displayError(grossInput, errorIcon, 'Please enter a valid gross income');
    });

    extraInput.addEventListener('input', () =>{
        displayError(extraInput, extraErrorIcon, 'Please enter a valid extra income');
    });

    deductionInput.addEventListener('input', () => {
        displayError(deductionInput, deductionErrorIcon, 'Please enter a valid deduction amount');
    });

    document.getElementById('taxForm').addEventListener('submit', function(event){
        event.preventDefault();

        let grossIncome = parseFloat(grossInput.value) || 0;
        grossIncome *= 100000;

        let extraIncome = parseFloat(extraInput.value) || 0;
        extraIncome *= 100000;

        let ageGroup = document.getElementById('ageGroup').value;
        let deductions = parseFloat(deductionInput.value) || 0;
        deductions *= 100000;

        let overallIncome;
        let finalOverallIncome;

        if (ageGroup === "Select") {
            alert("Please select the age group.");
            return; // Stop further processing if age group is not selected
        }
        overallIncome = grossIncome + extraIncome - deductions;


        if (overallIncome < 800000) {
            finalOverallIncome = overallIncome;
        }
        else {
            let taxAbleAmount = overallIncome - 800000;

            switch (ageGroup) {
                case "Below 40":
                    finalOverallIncome = overallIncome - (taxAbleAmount * 0.3);
                    break;
                case "40 to 59":
                    finalOverallIncome = overallIncome - (taxAbleAmount * 0.4);
                    break;
                case "Senior Citizen(60 and over)":
                    finalOverallIncome = overallIncome - (taxAbleAmount * 0.1);
                    break;
                default:
                    finalOverallIncome = "Please select the age group";
                    finalOverallIncome.style.color = "red";
            }
        }

        let resultWindow = window.open('', '_blank', 'left=300,top=100,width=600,height=400');
        resultWindow.document.write(`
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f2f2f2;
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                        margin-top: 50px;
                    }
                    .close-button {
                        text-align: center;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                ${typeof finalOverallIncome === "number" ? "<h1>Your overall income will be: " + finalOverallIncome + "</h1>" : "<h1>" + finalOverallIncome + "</h1>"}
                <div class="close-button">
                    <button onclick="window.close()">Close Window</button>
                </div>
            </body>
        `);
        resultWindow.document.close(); 

    });
});
