# TRIPLEAIMS 웹 유지보수 설명서

## config

### history.html
 - 회사 연혁
 - 연혁 수정 및 추가는 여기서

### mapping.html
header를 자동생성을 해주며, class명에 따라서 herf속성을 생성해 줍니다. 

## js

### header.js
 - &lt;div id="top-container"&gt;에 header와 nav를 제공합니다.
    - nav를 생성할 때 **mapping.html**을 참고합니다.
 - &lt;div id="bottom-container"&gt;에 footer를 제공합니다.
 - &lt;div id="nav-bar"&gt;에 'data-title=[title]' 태그에 알맞은 nav를 제공합니다.
    - **mapping.html**을 참고합니다.
 - a.loc-[title], div.loc-[title]에 자동으로 경로를 생성합니다.

### generate_solution_list.js
 - solution_category.html 참조
 -  불러오지 못한 Solution Category를 &lt;div id="solution-contents"&gt;에 추가 제공합니다.
- **mapping.html**을 참고합니다.

### map.js 
 - index.html 참조
 - &lt;div id="map"&gt;에 지도를 생성합니다.