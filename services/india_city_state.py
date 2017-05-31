#!C:/Users/barraud/AppData/Local/Programs/Python/Python35/python.exe
"""Collate India City/State data"""
import csv


def main():
    """Starter"""
    longest_city_name = 0
    longest_state_name = 0
    longest_pincode = 0
    lines = []
    pincodes = []
    with open(r'C:\Users\barraud\Documents\tech\the-nefario-setup\tanikameds\app.files\db.reinit\Locality_village_pincode_final_mar-2017.csv', 'r') as data_file:
        reader = csv.DictReader(data_file)
        for row in reader:
            pincodes.append(row['Pincode'])
            if pincodes.count(row['Pincode']) > 1:
                print(row)
                
            if len(row['Pincode']) > longest_pincode:
                longest_pincode = len(row['Pincode'])
            if len(row['Districtname']) > longest_city_name:
                longest_city_name = len(row['Districtname'])
            if len(row['StateName']) > longest_state_name:
                longest_state_name = len(row['StateName'])
            lines.append(str(row['Pincode']).strip() + "|" +
                         str(row['Districtname']).strip() + "|" +
                         str(row['StateName']).strip())
    lines = list(set(lines))
    # print("\n".join(lines))
    indiacitystate = "indiacitystate"
    create_table = ("create table {0} (\n"
                    "\tid int unsigned NOT NULL AUTO_INCREMENT,\n"
                    "\tpincode varchar({1}) NOT NULL,\n"
                    "\tcityname varchar({2}) NOT NULL,\n"
                    "\tstatename varchar({3}) NOT NULL,\n"
                    "\tprimary key(id)\n"
                    ");".format(indiacitystate, longest_pincode,
                                longest_city_name, longest_state_name))
    with open(r'C:\Users\barraud\Documents\tech\the-nefario-setup\tanikameds\app.files\db.reinit\citystate.sql', 'w') as data_write:
        data_write.write("drop table if exists {0};\n".format(indiacitystate))
        data_write.write(create_table + "\n")
        data_write.write("insert into {0} (pincode, cityname, statename) values".format(indiacitystate) + "\n")
        linecounter = 0
        for line in lines:
            pincode, cityname, statename = line.split('|')
            if linecounter == len(lines) - 1:
                data_write.write("('{0}', '{1}', '{2}');".format(pincode, cityname, statename))
            else:
                data_write.write("('{0}', '{1}', '{2}'),\n".format(pincode, cityname, statename))
            linecounter += 1

if __name__ == "__main__":
    main()
