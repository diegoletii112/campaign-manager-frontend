## 🚀 QUICK START (DOCKER)

The entire system (Frontend + Backend) is dockerized. To run everything at once:

1. Clone this repository (Frontend).

2. Clone the **Backend repository** into the same parent folder:
   Link: [https://github.com/diegoletii112/campaign-manager-backend]
   
3. Your folder structure must look like this:
 ```text
 Parent Folder
├── campaign-manager-backend/
└── campaign-manager-frontend/  <-- (You are here)
```
Both repositories should be cloned into the same parent directory so that they are siblings.

4. Open a terminal in the `campaign-manager-frontend` folder.
5. Run the following command:
```bash
docker-compose up --build
```
