import axios from 'axios';

function createAxiosInstance() {
  return axios.create({
    baseURL: 'http://127.0.0.1:8080/onedaythink/api/v1/'
  })
}

function createJsonAxiosInstance (userInfo) {
    const instance = createAxiosInstance()
    instance.defaults.headers.post['Content-Type'] = 'application/json; charset-8'
    if (userInfo != null && userInfo.Authorization !== '') {
      instance.defaults.headers.common['Authorization'] = userInfo.Authorization
      instance.defaults.headers.common['RefreshTokenIdx'] = userInfo.RefreshTokenIdx
    }
    return instance
  }

  async function createChatCompletion(prompt) {
    const apiKey = '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';
    const url = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  
    try {
      const response = await axios.post(url, {
        prompt: prompt,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.5,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      });
  
      if (response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].text;
      } else {
        throw new Error("No response from API");
      }
    } catch (error) {
      console.error("Error in createChatCompletion:", error);
    }
  }

async function translateText(subjectText) {
    try {
      const prompt = `Translate the following text to English: '${subjectText}'`;
      const translatedText = await createChatCompletion(prompt);
      return translatedText;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async function generateDallE2Image(translatedText) {
    try {
      const prompt = `Given the following text "${translatedText}", extract 3 main keywords.`;
      const keywords = await createChatCompletion(prompt);
      const keywordArray = keywords.split(",").slice(0, 3);
      const keywordString = keywordArray.join(", ");
  
      const imagePrompt = `Create an image that represents the following keywords: ${keywordString}`;
      // Call createChatCompletion() with the DALL-E image prompt
      const imageResponse = await createChatCompletion(imagePrompt);
  
      return imageResponse.data.data[0].url;
    } catch (err) {
      console.error(err);
      throw err;
    }
}

async function saveImage(subjectId, imageUrl) {
  const axiosInstance = createJsonAxiosInstance();
  return await axiosInstance.post(`subjects/${subjectId}/image`, {
    imageUrl: imageUrl,
  });
}

async function extractKeywords(translatedText) {
    try {
      const prompt = `Extract 3 keywords from the following text: "${translatedText}"`;
      // Call createChatCompletion() with the keyword extraction prompt
      const keywords = await createChatCompletion(prompt);
      return keywords.trim().split(", ");
    } catch (err) {
      console.error(err);
      throw err;
    }
}
  
  async function translateAndGenerateImage(subjectText) {
    try {
      const translatedText = await translateText(subjectText);
      const keywords = await extractKeywords(translatedText);
      const imageUrl = await generateDallE2Image(keywords.join(", "));
      return imageUrl;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  

async function $postMainSubject(yyyymmdd){
    try {
        const axios = createJsonAxiosInstance()
        return await axios.post('subjects/main/'+yyyymmdd);        
    } catch (err) {
        console.log(err);
    }
}

export {
    translateText,
    generateDallE2Image,
    saveImage,
    translateAndGenerateImage,
    $postMainSubject,
    extractKeywords,
  };