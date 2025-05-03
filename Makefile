.PHONY:
dev:
	@echo "Running dev container"
	docker-compose -f dockers/dev/compose.dev.yml up --build
	@echo "Dev container is running"
