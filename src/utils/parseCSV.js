/**
 * Parse a CSV line handling quoted values
 */
function parseLine(line) {
  const values = []
  let current = ''
  let inQuotes = false

  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  values.push(current.trim())
  return values
}

/**
 * Parse CSV data from Google Sheets flight format
 * Handles merged headers (Landing/Departing)
 */
export function parseFlightsCSV(csv) {
  const lines = csv.trim().split('\n')

  // Skip the first row (Landing/Departing header) and use second row as headers
  const dataStartIndex = lines[0].toLowerCase().includes('landing') ? 2 : 1

  return lines.slice(dataStartIndex).filter(line => line.trim()).map(line => {
    const values = parseLine(line)

    // Map to our expected structure based on column position:
    // 0: Name, 1: Origin, 2: Landing Flight, 3: Landing Date/Time, 4: Landing Airport
    // 5: Departing Flight, 6: Departing Date/Time, 7: Departing Airport
    return {
      name: values[0] || '',
      origin: values[1] || '',
      landingFlight: values[2] || '',
      landingDateTime: values[3] || '',
      landingAirport: values[4] || '',
      departingFlight: values[5] || '',
      departingDateTime: values[6] || '',
      departingAirport: values[7] || ''
    }
  })
}
