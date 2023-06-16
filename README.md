## Sistema pra oficinas automotivas

Software sendo desenvolvido com o objetivo de gerenciar uma oficina automotiva de forma simples.

[Veja como está até o momento](https://sistema-oficina-automotiva.vercel.app/ "Veja como está até o momento")

###### Funcionalidades
- [x] CRUD de clientes
- [x] CRUD de veículos
- [x] CRUD de produtos
- [x] CRUD de orçamentos
- [ ] Criação de Nota Fiscal
- [ ] Gerenciador de estoque
- [ ] Gerar um orçamento em PDF

###### Backend
- Java
- Spring Boot
- JPA/Hibernate
- SQL-Deploy
- H2-Desenvolvimento

Foi utilizado o padrão MVC para a organização e estruturação do código. Isso porque o Spring Boot tem uma integração perfeita com o padrão em questão.
	
O JPA/Hibernate facilitou a persistência de dados com o banco SQL. Para testar as requsições foi utilizado o Postman e o banco H2.

###### Frontend
- JavaScript
- ReactJS
- Styled-Components
- PrimeFaces

A aplicação foi feita em ReactJS, para facilitar a criação dos components usei a biblioteca PrimeFaces. No entanto, foi necessárias muitas alterações na estilização original dos componentes e para isso o styled-components me ajudou a ter um código mais limpo e reutilizável.
	
Para otimizar o cadastro dos clientes, a **API ViaCEP** foi de extrema ajuda, isso porque basta o usuário digitar O CEP que automaticamente os campos do endereço são parcialmente preenchidos.
	
###### Desafios
Estruturação da aplicação. Foi necessário diversas mudanças até conseguir criar um orçamento com as informações básicas.
	
Estruturar melhor o Dashboard com tabelas e gráficos informativos.

