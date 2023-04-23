<template>
    <basic-layout>

      ```css
    /* 분홍색 배경색인 입력칸 스타일 */
    .input-field {
      background-color: pink;
      border: none;
      height: 40px;
      width: 250px;
      font-size: 16px;
      color: white;
      padding: 5px;
    }

    /* 노란색 배경색이고 하얀색 글씨로 '확인'이라고 쓰여있는 버튼 스타일 */
    .confirm-button {
      background-color: yellow;
      color: white;
      border: none;
      height: 40px;
      width: 100px;
      font-size: 16px;
      cursor: pointer;
    }

    /* 입력칸과 버튼을 담을 div 스타일 */
    .input-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    ```

    ```html
    <div class="input-container">
      <input type="text" placeholder="입력칸" class="input-field">
      <button class="confirm-button">확인</button>
    </div>
    ``` 

    위와 같이 CSS와 HTML을 작성하면 분홍색 배경색인 입력칸과 노란색 배경색이고 하얀색 글씨로 '확인'이라고 쓰여있는 버튼이 가운데에 위치한 입력칸을 만들 수 있습니다.

        
    </basic-layout>
</template>

<script>
import BasicLayout from '@/components/basic/BasicLayout.vue';

export default{
    name : 'MainView',
    components : {
        BasicLayout
    }
};
</script>