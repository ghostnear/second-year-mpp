.PHONY: prepare-backend run-backend run-frontend

prepare-backend:
	@pip install -r backend/requirements.txt

test-backend:
	@echo "[INFO]: Running backend tests..."
	@python -m coverage run ./backend/__tests__.py
	@python -m coverage report -m

run-backend: prepare-backend
	@echo "[INFO]: Running backend..."
	@python backend

dependencies-frontend:
	@echo "[INFO]: Installing frontend dependencies..."
	@cd frontend && npm install

clean-frontend:
	@echo "[INFO]: Cleaning frontend..."
	@cmd /c rmdir /Q /S frontend\.parcel-cache
	@cmd /c rmdir /Q /S frontend\node_modules
	@cmd /c rmdir /Q /S frontend\dist
	@cmd /c rmdir /Q /S frontend\public

run-frontend-production:
	@echo "[INFO]: Running frontend in Production mode..."
	@npm run build --prefix frontend
	@npx serve -s frontend/public

run-frontend:
	@echo "[INFO]: Running frontend in Debug mode..."
	@npm run dev --prefix frontend