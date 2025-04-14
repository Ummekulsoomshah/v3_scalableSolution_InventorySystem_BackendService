#   🧾 Inventory Tracking Backend Service

##   Overview

This project contains three evolving versions (v1 → v3) of a backend service designed to track product inventory and stock movements, starting from a single kiryana store and scaling to support thousands of stores.The system is designed for high performance, scalability, and reliability to support high-volume retail operations. 

---
* `version 1` : https://github.com/Ummekulsoomshah/v1_singleStore_BackendService
* `version 2` : https://github.com/Ummekulsoomshah/v2_multiStore_BackendService

##   Design Decisions

###   v1: Single Store Inventory Tracking

* **Technology Stack:** Node.js with Express.js
* **Database:** SQLite for local storage. 
* **Data Model:**
    * `products`: (id, name,category)
    * `stock_movements`: (id, product_id, movement, Quantity)
    * `current_stock` : (product_id ,quantity) here product_id is the primary key 
* **API:** Simple REST API for basic inventory management. 
* **Purpose:** To model product stock-in, sales, and manual removals for a single store. 

###   v2: Multi-Store Inventory Management

* **Technology Stack:** Node.js with Express.js, PostgreSQL. 
* **Database:** PostgreSQL to support multiple stores and a central product catalog. 
* **Data Model:**
    * `product`: (id, name, price) - Central product catalog.
    * `store`: (id, name, address)
    * `StoreStocks`: (id, store_id, product_id,quantity) - Store-specific stock.
* **API:** REST API endpoints for core actions, filtering/reporting by store and date range.
* **Security:** Request throttling with sliding window technique.
* **Purpose:** To support 500+ stores with a central product catalog and store-specific stock management. 

###   v3: Scalable Distributed System

* **Technology Stack:** Microservices architecture with Node.js, PostgreSQL,BullMQ, Redis.
* **Architecture:**
    * **Microservices:** The system is divided into the following services:
        * **Product Service:** Manages the central product catalog.
        * **Store Service:** Handles store registration and management.
        * **Order Service:** Works as Job generator to add order record into the queue to support the event driven programming using BullMq
        * **Inventory Service:** Add records asynchronously as a consumer 
* **Features:**
    * Asynchronous updates (event-driven architecture). 
    * API rate limits. 
    * Cashing using Redis to efficiently load the data of stores and products. 
* **Purpose:** To support thousands of stores, concurrent operations, near real-time stock synchronization 

---

##   Assumptions

* Stores themselves update the stock level on removal, addition, and sales.
* Initial focus is on stock management, not complex order processing.
* Modular structure potential to scale later,normalized database and security are critical throughout all stages. 

---

##  🛠 API Design

###   v1 API

* `POST /addproduct`: Creates a new item.
* `POST /addQuantity/:prodId`: Update stock level of product on removal,additon,or sales.
* `GET /getCurrentStock/:prodId`:Retrive the current stock of the perticular product
* (Note: v1 API is basic, reflecting the single-store focus)

###   v2 Changes
* **Product:**
    * `POST /createProduct`: Create product by admin in central catalog only
    * `GET /allProducts`: Retrives all the products by stores on their platform
* **Store:**
    * `POST /addStore`: Register/add store
    * `GET /allStores`: Retrives all the stores
* **Stock:**
    * `GET /stock/store/:storeId`: Retrieves the stock levels for a specific store.
    * `PUT /stock/:storeId/:prodId`: Updates the stock level for a product in a store.
    * `GET /stockMovement`:Retrive history of stock changes by stores filter by date or store

* (Note: v2 API introduces store-specific stock management)

###   v3 Improvements
* Stack: Node.js, PostgreSQL, Redis, BullMQ
* Introduced Services to scale appplication efficiently using Microservices Architecture 
* Services for Product,Store,Order,Inventory 
* Assumption : Here in the third version main focus on the sales for that Order Service was made when admin add the amount of sales this event is asynchrounously updates the storeStock table in database  through Inventory Service 
* `POST /api/order/orderProduct/:prodId` :This aims to add the product sales and generate the job named `stock_add` into the `inventory_events` queue 
it then trigger the worker into the `inventory service`
* `inventoryWorker.js` :Process the job and add this sales record into the storestock table into the database updates it with new reduction in quanity.
* (Note: v3 API emphasizes scalability and asynchronous operations)
* **Feature:**
    * Event-driven architecture with BullMQ
    * Async background processing
    * Redis for caching (hot data: stores, products)
    * API rate limiting
* **🚀 Future Work:**  
    * **Data Replication:** Implement data replication strategies to ensure high availability and fault tolerance. This is crucial for reading data from the Product, Inventory, and Store services, especially when dealing with a massive user base. Relying on a single server is not feasible for such a scale.
    * **Advanced Analytics:** Introduce analytics services to provide insights into sales trends, stock movements, and store performance.
    * **Enhanced Security:** Implement advanced security measures such as role-based access control (RBAC), data encryption, and audit logging.
---

##   Evolution Rationale

* **v1 → v2:** Added support for multiple stores and a central product catalog to scale the system from a single store to 500+ stores.  This involved a shift from local storage to a relational database and the introduction of REST API endpoints and adding more meaningfull endpoints for full fledged application
* **v2 → v3:** Focused on optimization and scalability to support thousands of stores and high concurrency. This required a microservices architecture, asynchronous updates using bullmq that help to allign the jobs in queue and process them asynchronously, caching to support the user load the data of non frequently changed data such as that of stores and products which are massive for realworld thousand stores inventory system.