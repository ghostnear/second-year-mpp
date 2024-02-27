.PHONY: prepare-backend run-backend run-frontend

prepare-backend:
	@pip install -r backend/requirements.txt

run-backend: prepare-backend
	@echo "[INFO]: Running backend..."
	@python backend

run-frontend:
	@echo "[INFO]: Running frontend..."
	@npm start --prefix frontend