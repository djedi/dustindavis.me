# Friendly shortcuts for working on dustindavis.me.

SHELL := /bin/bash
.DEFAULT_GOAL := help
.DELETE_ON_ERROR:

PNPM ?= pnpm
PORT ?= 8080
URL := http://localhost:$(PORT)
EXTENSIONS_FILE ?=

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
	check lint format format-check fix verify ci doctor \
	new-post update-data update-apps update-cli update-extensions migrate-images

help: ## Show this help
	@printf "$(BOLD)dustindavis.me$(RESET) — local development commands\n\n"
	@awk 'BEGIN { FS = ":.*## "; printf "$(BOLD)Usage:$(RESET) make $(BLUE)<target>$(RESET) [VAR=value]\n\n" } \
		/^[a-zA-Z_-]+:.*## / { printf "  $(BLUE)%-20s$(RESET) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@printf "\n$(BOLD)Examples:$(RESET)\n"
	@printf "  make dev PORT=3000\n"
	@printf "  make update-extensions EXTENSIONS_FILE=~/Downloads/extensions.html\n"

setup: doctor install ## Check prerequisites and install dependencies
	@printf "\n$(GREEN)Ready! Run 'make dev' to start the blog.$(RESET)\n"

install: ## Install the exact dependencies from pnpm-lock.yaml
	@command -v $(PNPM) >/dev/null 2>&1 || { \
		printf "$(YELLOW)pnpm is required. Install it with: corepack enable pnpm$(RESET)\n" >&2; \
		exit 1; \
	}
	$(PNPM) install --frozen-lockfile

dev: ## Start Eleventy with live reload (PORT=8080; opens browser when ready)
	@printf "$(GREEN)Starting the blog at $(URL)$(RESET)\n"
	@$(PNPM) exec eleventy --serve --incremental --port=$(PORT) & \
		pid=$$!; \
		trap 'kill $$pid 2>/dev/null' EXIT INT TERM; \
		i=0; \
		until curl -sf -o /dev/null "$(URL)"; do \
			i=$$((i+1)); \
			if [ $$i -ge 120 ]; then \
				printf "$(YELLOW)Server not up on $(URL) yet — opening anyway.$(RESET)\n"; \
				break; \
			fi; \
			sleep 0.5; \
		done; \
		if command -v open >/dev/null 2>&1; then \
			open "$(URL)"; \
		elif command -v xdg-open >/dev/null 2>&1; then \
			xdg-open "$(URL)"; \
		else \
			printf "$(GREEN)Ready at $(URL)$(RESET)\n"; \
		fi; \
		wait $$pid

serve: dev ## Alias for dev

open: ## Open the local blog in your default browser (PORT=8080)
	@if command -v open >/dev/null 2>&1; then \
		open "$(URL)"; \
	elif command -v xdg-open >/dev/null 2>&1; then \
		xdg-open "$(URL)"; \
	else \
		printf "Open $(URL) in your browser.\n"; \
	fi

build: ## Build the production site into _site/
	NODE_ENV=production $(PNPM) run build

clean: ## Remove generated site files
	$(PNPM) run clean

fresh: clean install build ## Clean, reinstall, and rebuild from scratch

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
	for tool in jq curl brew sips; do \
		if command -v "$$tool" >/dev/null 2>&1; then \
			printf "  $(GREEN)✓$(RESET) %s\n" "$$tool"; \
		else \
			printf "  - %-10s not found\n" "$$tool"; \
		fi; \
	done; \
	exit $$failed

new-post: ## Interactively scaffold today's blog post
	./newpost.sh

update-data: update-apps update-cli ## Refresh application and CLI-tool data

update-apps: ## Refresh installed application data (macOS)
	./get-applications.sh

update-cli: ## Refresh Homebrew CLI-tool data (macOS)
	./get-cli-tools.sh

update-extensions: ## Import Chrome extensions (EXTENSIONS_FILE=path/to/export.html)
	@test -n "$(EXTENSIONS_FILE)" || { \
		printf "$(YELLOW)Usage: make update-extensions EXTENSIONS_FILE=path/to/extensions.html$(RESET)\n" >&2; \
		exit 2; \
	}
	@test -f "$(EXTENSIONS_FILE)" || { \
		printf "$(YELLOW)File not found: %s$(RESET)\n" "$(EXTENSIONS_FILE)" >&2; \
		exit 2; \
	}
	./generate-extensions.js "$(EXTENSIONS_FILE)"

migrate-images: ## Convert Markdown images to shortcodes (requires CONFIRM=1)
	@test "$(CONFIRM)" = "1" || { \
		printf "$(YELLOW)This rewrites images across every blog post. Re-run with CONFIRM=1.$(RESET)\n" >&2; \
		exit 2; \
	}
	./update-blog-images.js
