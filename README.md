# Termo

This project is based on the original website <a href="https://term.ooo/">termo</a>. The game consist of guessing the word in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the word.

<br>


<div align=center>
  <img style="width: 600px;" src="/src/assets/images/termo_demo.gif" />
</div>

  <div align=center>
  <a href="https://github.com/rods-duarte/projeto-termo-front">front-end</a> | <a href="https://github.com/rods-duarte/projeto-termo-back">back-end</a>
</div>
  


# Features
<ul>
  <li> Signup and signin </li>
  <li> Login permanence with local storage</li>
  <li> New word available every day </li>
  <li> User statistic saved on server </li>
  <li> CSS animations </li>
</ul>

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white'>
</p>

## How to run for development
1. Follow the steps for the <a href="https://github.com/rods-duarte/projeto-termo-back">back-end server</a>
1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Populate `.env` file based on `.env.example`. `REACT_APP_API_BASE_URL` should point to your API server (<a href="https://github.com/rods-duarte/projeto-termo-back">termo backend</a>)

4. Run the front-end in a development environment:

```bash
npm run start
```

