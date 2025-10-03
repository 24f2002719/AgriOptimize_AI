const cropForm = document.getElementById('crop-form');
const fertilizerForm = document.getElementById('fertilizer-form');

// Templates for displaying results dynamically
const successTemplate = (title, value) => `
    <div class="fade-in mt-6 p-5 border-l-4 border-green-500 bg-green-50 rounded-r-lg flex items-center gap-4">
        <svg class="w-12 h-12 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        <div>
            <h3 class="font-bold text-lg text-green-800">${title}</h3>
            <p class="text-3xl font-semibold text-gray-800 capitalize">${value}</p>
        </div>
    </div>`;

const errorTemplate = (message) => `
    <div class="fade-in mt-6 p-5 border-l-4 border-red-500 bg-red-50 rounded-r-lg flex items-center gap-4">
        <svg class="w-12 h-12 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
        <div>
            <h3 class="font-bold text-lg text-red-800">An Error Occurred</h3>
            <p class="text-gray-700">${message}</p>
        </div>
    </div>`;

const handleFormSubmit = async (e, formType) => {
    e.preventDefault();
    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.spinner');
    const resultDiv = document.getElementById('result-container');
    
    btnText.textContent = formType === 'crop' ? 'Analyzing...' : 'Predicting...';
    spinner.classList.remove('hidden');
    button.disabled = true;
    resultDiv.innerHTML = ''; // Clear previous results

    const formData = new FormData(form);
    let data, endpoint, title, key;
    
    if (formType === 'crop') {
        data = { n: formData.get('crop-n'), p: formData.get('crop-p'), k: formData.get('crop-k'), temperature: formData.get('crop-temp'), humidity: formData.get('crop-humidity'), ph: formData.get('crop-ph'), rainfall: formData.get('crop-rainfall') };
        endpoint = '/api/recommend/crop';
        title = 'Recommended Crop';
        key = 'crop';
    } else {
        data = { Temparature: formData.get('fert-temp'), Humidity: formData.get('fert-humidity'), Moisture: formData.get('fert-moisture'), Soil_Type: formData.get('fert-soil'), Crop_Type: formData.get('fert-crop'), Nitrogen: formData.get('fert-n'), Phosphorous: formData.get('fert-p'), Potassium: formData.get('fert-k') };
        endpoint = '/api/recommend/fertilizer';
        title = 'Recommended Fertilizer';
        key = 'fertilizer';
    }
    
    try {
        const response = await fetch(`${backendUrl}${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        const result = await response.json();
        if (!response.ok || result.error) throw new Error(result.error || 'Server responded with an error');
        resultDiv.innerHTML = successTemplate(title, result[key]);
    } catch (error) {
        resultDiv.innerHTML = errorTemplate(error.message);
    } finally {
        btnText.textContent = formType === 'crop' ? 'Recommend Crop' : 'Recommend Fertilizer';
        spinner.classList.add('hidden');
        button.disabled = false;
    }
};

if (cropForm) cropForm.addEventListener('submit', (e) => handleFormSubmit(e, 'crop'));
if (fertilizerForm) fertilizerForm.addEventListener('submit', (e) => handleFormSubmit(e, 'fertilizer'));