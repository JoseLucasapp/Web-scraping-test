Regras do teste:

1 - Acessar esse site e pegar todos notebooks Lenovo ordenando do mais barato para o mais caro.

2 - Pegar todos os dados disponíveis dos produtos.

3 - REST Full API JSON.

4 - Utilizar Puppeteer ou Playwright

## Como rodar a aplicação:

No terminal, clone o projeto:
```
git clone https://github.com/JoseLucasapp/Web-scraping-test.git && cd Web-scraping-test
```

### Para inicializar o projeto:

utilizando yarn:
```
yarn && yarn start
```

utilizando npm:
```
npm install && npm start
```

### Para acessar o app:

url: <a href='http://localhost:3333/api'>http://localhost:3333/api</a>

## Build

Caso não deseje instalar o app, você pode acessar <a href='https://desafio-web-scraping.herokuapp.com/api'>aqui</a>.

## Exemplo de retorno:

```
{
  "data": [
	  {
		  "title": "Lenovo V110-15IAP",
		  "description": "Lenovo V110-15IAP, 15.6\" HD, Celeron N3350 1.1GHz, 4GB, 128GB SSD, Windows 10 Home",
		  "price": 321.94,
		  "reviews": 5,
		  "ratings": 3,
		  "imageUrl": "https://webscraper.io/images/test-sites/e-commerce/items/cart2.png"
	  },
  ],
  "total":1
}

```

