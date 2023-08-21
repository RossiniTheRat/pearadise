document.getElementById('plantIdentificationForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const imageInput = document.getElementById('plantImage');
    const imageFile = imageInput.files[0];

    // Check if a file is selected and convert it to Base 64
    if (imageFile) {
        const reader = new FileReader();

        reader.readAsDataURL(imageFile);

        reader.onload = function () {
            const base64Image = reader.result;
            sendImageForIdentification(base64Image);
        };

    } else {
        console.error('Error with file conversion', error)
        alert('Please select an image file.');
    }
});

async function sendImageForIdentification(base64Image) {
    try {
        const response = await fetch('https://api.plant.id/v2/identify', {
            method: 'POST',
            headers: {
                'Api-Key': 'h4lJYK5BNbIJXYaQWQmEzAl8jkm0JXFF5anQdz06xE3QPwPJCW',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                images: base64Image,
            }),
        });

        if (response.ok) {
            const data = await response.json();

            if (data.suggestions.length > 0) {
                const topSuggestion = data.suggestions[0];
                document.getElementById('plantName').textContent = topSuggestion.plant_name;
                document.getElementById('probability').textContent = `${(topSuggestion.probability * 100).toFixed(2)}%`;
                document.getElementById('identificationResult').style.display = 'block';

                // Display image preview
                const avatar = document.getElementById("avatar");
                avatar.src = base64Image;
            } else {
                alert('Plant identification failed. Please try another image.');
            }
        } else {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        alert('An error occurred during identification. Please try again later.');
    }
}

