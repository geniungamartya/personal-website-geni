FROM python:3.12

# Ensures that Python outputs (e.g., print()) are displayed in real-time, rather than being buffered.
# Prevents Python from creating .pyc and __pycache__ files.
# Disables the cache when installing Python packages with pip.
# Allows pip install to modify system-wide Python packages.
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_BREAK_SYSTEM_PACKAGES=1 

WORKDIR /app

# Copy only requirements first to leverage docker cache
COPY requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY prestart.sh alembic.ini /app/
COPY ./alembic /app/alembic
COPY ./script /app/script
COPY ./app /app/app

CMD ["fastapi", "run", "--workers", "4", "app/main.py"]
