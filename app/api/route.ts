import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { setMap, validationData } from './mapFunc';
import { Input } from 'postcss';

export async function GET(req: NextRequest) {
    // Define the path to the image in the public folder
    const imagePath = path.join(process.cwd(), 'public/Logo.png');

    // Read the image file from the filesystem
    const image = await fs.readFile(imagePath);
  
    // Return the image as a response with the appropriate content type
    return new NextResponse(image, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
}

const data = {
  "districts": [
    ["Ampara", 10], ["Anuradhapura", 20], ["Badulla", 30], ["Baticalo", 40], ["Colombo", 50], ["Galle", 60], ["Gampaha", 70], ["Hambantota", 80], ["Jafna", 90], ["Kegalle", 100], ["Kalutara", 90], ["Kandy", 80], ["Kilinochchi", 70], ["Kurunegala", 60], ["Mannar", 50], ["Matale", 40], ["Matara", 20], ["Monaragala", 30], ["Mulative", 10], ["Nuwara Eliya", 20], ["Polonnaruwa", 0], ["Puttalama", 50], ["Ratnapura", 30], ["Trincomalee", 30], ["Wavunia", 70]
  ],
  "options": {
    "min": 0,
    "max": 0,
    "minColor": "#FFFFFF",
    "maxColor": "#0000FF",
    "grouped": false,
    "labels": false,
    "scale": false,
    "sea": false
  }
};

// Define the valid district names in the required order
const validDistricts = [
  "Ampara", "Anuradhapura", "Badulla", "Baticalo", "Colombo", "Galle",
  "Gampaha", "Hambantota", "Jafna", "Kegalle", "Kalutara", "Kandy",
  "Kilinochchi", "Kurunegala", "Mannar", "Matale", "Matara", "Monaragala",
  "Mulative", "Nuwara Eliya", "Polonnaruwa", "Puttalama", "Ratnapura",
  "Trincomalee", "Wavunia"
];

export async function POST(req: NextRequest) {
  const data = await req.json();

  // Validation for districts array
  const districts = data.districts;

  // 1. Check if there are 25 elements and order matches validDistricts
  if (districts.length !== 25) {
    return NextResponse.json({ error: 'Districts array must contain exactly 25 elements' }, { status: 400 });
  }

  for (let i = 0; i < validDistricts.length; i++) {
    const [districtName, value] = districts[i];

    // Check if district name matches the required order and is case-insensitive
    if (districtName.toLowerCase() !== validDistricts[i].toLowerCase()) {
      return NextResponse.json({ error: `District name at index ${i} is invalid or out of order` }, { status: 400 });
    }

    // 2. Check if the value is a number
    if (typeof value !== 'number') {
      return NextResponse.json({ error: `Value for district ${districtName} must be a number` }, { status: 400 });
    }
  }

  // Validation for options object
  const options = data.options;

  // 1. Check for required properties and their types
  const { min, max, minColor, maxColor, grouped, labels, scale, sea } = options;

  if (typeof min !== 'number' || typeof max !== 'number' ||
      typeof minColor !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(minColor) ||
      typeof maxColor !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(maxColor)) {
    return NextResponse.json({ error: 'Invalid types or missing required options properties' }, { status: 400 });
  }

  // 2. Check grouped is boolean
  if (typeof grouped !== 'boolean') {
    return NextResponse.json({ error: 'Grouped must be a boolean' }, { status: 400 });
  }

  //check grouping
  if(typeof grouped !== 'boolean'){
    return NextResponse.json({ error: 'Grouped must be a boolean' }, { status: 400 });
  }else if(grouped){
    if(data.options.hasOwnProperty('groups') === false){
      return NextResponse.json({ error: 'No of roups must be provided when grouped is true' }, { status: 400 });
    }
    if (typeof options.groups !== 'number' && options.groups < 1) {
      return NextResponse.json({ error: 'Groups must be a positive number' }, { status: 400 });
    }
  }

  // 3. Check labels
  if (!(typeof labels === 'boolean' ||/^#[0-9A-Fa-f]{6}$/.test(labels))) {
    return NextResponse.json({ error: "Labels must be a boolean or a HEX color" }, { status: 400 });
  }

  // 4. Check scale is boolean
  if (typeof scale !== 'boolean') {
    return NextResponse.json({ error: 'Scale must be a boolean' }, { status: 400 });
  }

  // 5. Check sea
  if (!(typeof sea === 'boolean' || /^#[0-9A-Fa-f]{6}$/.test(sea))) {
    return NextResponse.json({ error: "Sea must be false or a HEX color" }, { status: 400 });
  }

  if(!validationData(data.options.min,data.options.max,data.districts)){
    return NextResponse.json({ error: "Check the numeric range validity" }, { status: 400 });
  }

  // If all checks pass, return 200
  return NextResponse.json({ result: setMap(data) }, { status: 200 });
}


