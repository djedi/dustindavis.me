# Friendly shortcuts for working on dustindavis.me.

SHELL := /bin/bash
.DEFAULT_GOAL := help
.DELETE_ON_ERROR:

PNPM ?= pnpm
PORT ?= 8080
URL := http://localhost:$(PORT)

# Docker: an uncommon port so it won't collide with other local projects.
COMPOSE ?= docker compose
SERVICE := blog
BLOG_PORT ?= 41180
DOCKER_URL := http://localhost:$(BLOG_PORT)
export BLOG_PORT
PROFILES ?=

# Open a URL in the default browser (macOS or Linux).
define open_url
	if command -v open >/dev/null 2>&1; then open "$(1)"; \
	elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$(1)"; \
	else printf "Open $(1) in your browser.\n"; fi
endef

# Wait up to 60s for a URL to answer.
define wait_for
	i=0; until curl -sf -o /dev/null "$(1)"; do \
		i=$$((i+1)); \
		if [ $$i -ge 120 ]; then printf "$(YELLOW)$(1) not answering yet — opening anyway.$(RESET)\n"; break; fi; \
		sleep 0.5; \
	done
endef

# Colors are enabled only for an interactive terminal.
ifneq ($(TERM),dumb)
  ifneq ($(shell test -t 1 && echo yes),)
    BLUE := \033[36m
    GREEN := \033[32m
    YELLOW := \033[33m
    BOLD := \033[1m
    RESET := \033[0m
  endif
endif

.PHONY: help setup install dev serve open build clean fresh \
	up down restart logs shell ps rebuild nuke \
	check lint format format-check fix verify ci doctor \
	new-post update-data update-apps update-cli update-extensions brave-profiles migrate-images

help: ## Show this help
	@printf "$(BOLD)dustindavis.me$(RESET) — local development commands\n"
	@awk 'BEGIN { FS = ":.*## "; printf "\n$(BOLD)Usage:$(RESET) make $(BLUE)<target>$(RESET) [VAR=value]\n" } \
		/^##@/ { printf "\n$(BOLD)%s$(RESET)\n", substr($$0, 5) } \
		/^[a-zA-Z_-]+:.*## / { printf "  $(BLUE)%-20s$(RESET) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@printf "\n$(BOLD)Examples:$(RESET)\n"
	@printf "  make up                 # blog in Docker at $(DOCKER_URL)\n"
	@printf "  make up BLOG_PORT=41181\n"
	@printf "  make dev PORT=3000\n"
	@printf "  make update-extensions PROFILES=\"Personal,Profile 2\"\n"

##@ Docker (recommended)

up: ## Build & start the blog in Docker with live reload, then open the browser
	@$(COMPOSE) up -d --build
	@printf "$(GREEN)Waiting for $(DOCKER_URL)…$(RESET)\n"
	@$(call wait_for,$(DOCKER_URL)); $(call open_url,$(DOCKER_URL))
	@printf "$(GREEN)Blog running at $(DOCKER_URL) — edits reload automatically.$(RESET)\n"
	@printf "  make logs  # follow output    make down  # stop\n"

down: ## Stop and remove the Docker container
	$(COMPOSE) down

restart: ## Restart the blog container
	$(COMPOSE) restart $(SERVICE)

logs: ## Follow the blog container logs
	$(COMPOSE) logs -f --tail=100 $(SERVICE)

shell: ## Open a shell inside the running container
	$(COMPOSE) exec $(SERVICE) bash

ps: ## Show container status
	$(COMPOSE) ps

rebuild: ## Rebuild the image from scratch (after dependency changes) and start
	$(COMPOSE) down -v
	$(COMPOSE) build --no-cache
	@$(MAKE) --no-print-directory up

nuke: ## Remove the container, image, and node_modules volume
	$(COMPOSE) down -v --rmi local

##@ Setup

setup: doctor install ## Check prerequisites and install dependencies
	@printf "\n$(GREEN)Ready! Run 'make dev' to start the blog.$(RESET)\n"

install: ## Install the exact dependencies from pnpm-lock.yaml
	@command -v $(PNPM) >/dev/null 2>&1 || { \
		printf "$(YELLOW)pnpm is required. Install it with: corepack enable pnpm$(RESET)\n" >&2; \
		exit 1; \
	}
	$(PNPM) install --frozen-lockfile

##@ Local (no Docker)

dev: ## Start Eleventy locally with live reload (PORT=8080; opens browser)
	@printf "$(GREEN)Starting the blog at $(URL)$(RESET)\n"
	@$(PNPM) exec eleventy --serve --incremental --port=$(PORT) & \
		pid=$$!; \
		trap 'kill $$pid 2>/dev/null' EXIT INT TERM; \
		$(call wait_for,$(URL)); \
		$(call open_url,$(URL)); \
		wait $$pid

serve: dev ## Alias for dev

open: ## Open the blog in your browser (Docker port if running, else PORT)
	@if curl -sf -o /dev/null "$(DOCKER_URL)"; then $(call open_url,$(DOCKER_URL)); \
	else $(call open_url,$(URL)); fi

##@ Build

build: ## Build the production site into _site/
	NODE_ENV=production $(PNPM) run build

clean: ## Remove generated site files
	$(PNPM) run clean

fresh: clean install build ## Clean, reinstall, and rebuild from scratch

##@ Quality

check: ## Run Biome's formatter and linter checks
	$(PNPM) exec biome check .

lint: ## Run JavaScript and JSON lint checks
	$(PNPM) exec biome lint .

format: ## Format supported files in place
	$(PNPM) exec biome format --write .

format-check: ## Check formatting without changing files
	$(PNPM) exec biome format .

fix: ## Apply Biome's safe formatting and lint fixes
	$(PNPM) exec biome check --write .

verify: check build ## Run all local pre-commit checks

ci: install verify ## Reproduce the continuous-integration checks locally

##@ Utilities

doctor: ## Report required and optional development tools
	@printf "$(BOLD)Required tools$(RESET)\n"
	@failed=0; \
	for tool in node $(PNPM); do \
		if command -v "$$tool" >/dev/null 2>&1; then \
			printf "  $(GREEN)✓$(RESET) %-10s %s\n" "$$tool" "$$($$tool --version | head -1)"; \
		else \
			printf "  $(YELLOW)✗$(RESET) %-10s missing\n" "$$tool"; \
			failed=1; \
		fi; \
	done; \
	printf "\n$(BOLD)Optional data-refresh tools$(RESET)\n"; \
	for tool in docker claude jq curl brew sips; do \
		if command -v "$$tool" >/dev/null 2>&1; then \
			printf "  $(GREEN)✓$(RESET) %s\n" "$$tool"; \
		else \
			printf "  - %-10s not found\n" "$$tool"; \
		fi; \
	done; \
	exit $$failed

##@ Content & data

new-post: ## Interactively scaffold today's blog post
	./newpost.sh

update-data: update-apps update-cli ## Refresh application and CLI-tool data

update-apps: ## Refresh installed application data (macOS)
	./get-applications.sh

update-cli: ## Refresh Homebrew CLI-tool data (macOS)
	./get-cli-tools.sh

update-extensions: ## Refresh extensions from Brave profiles (PROFILES="Personal,Profile 2")
	./generate-extensions.js "$(PROFILES)"

brave-profiles: ## List Brave profiles available to update-extensions
	./generate-extensions.js --list

migrate-images: ## Convert Markdown images to shortcodes (requires CONFIRM=1)
	@test "$(CONFIRM)" = "1" || { \
		printf "$(YELLOW)This rewrites images across every blog post. Re-run with CONFIRM=1.$(RESET)\n" >&2; \
		exit 2; \
	}
	./update-blog-images.js
