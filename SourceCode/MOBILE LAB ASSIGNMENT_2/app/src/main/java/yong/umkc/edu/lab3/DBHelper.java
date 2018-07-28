package yong.umkc.edu.lab3;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;

import java.util.ArrayList;
import java.util.List;

public class DBHelper extends SQLiteOpenHelper{
    private static final int DATABASE_VERSION = 1;
    private static final String DATABASE_NAME = "lab3.db";
    private static final String TABLE_NAME = "lab3";
    private static final String TEXT_COLUMN = "text";

    public DBHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    // Creating Tables
    @Override
    public void onCreate(SQLiteDatabase db) {
        String CREATE_CONTACTS_TABLE = "CREATE TABLE " + TABLE_NAME + "(" + TEXT_COLUMN + " TEXT)";
        db.execSQL(CREATE_CONTACTS_TABLE);
    }

    // Upgrading database
    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Drop older table if existed
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NAME);
        // Create tables again
        onCreate(db);
    }

    void addRecord(RecordData data) {
        SQLiteDatabase db = this.getWritableDatabase();
        db.execSQL("DELETE FROM " + TABLE_NAME);

        ContentValues values = new ContentValues();
        values.put(TEXT_COLUMN, data.getText());
        db.insert(TABLE_NAME, null, values);
        db.close();
    }

    public RecordData getData() {
        List<RecordData> recordDataList = new ArrayList<RecordData>();
        String selectQuery = "SELECT * FROM " + TABLE_NAME;
        SQLiteDatabase db = this.getWritableDatabase();
        Cursor cursor = db.rawQuery(selectQuery, null);
        if (cursor.moveToFirst()) {
            do {
                RecordData data = new RecordData(cursor.getString(0));
                // Adding contact to list
                recordDataList.add(data);
            } while (cursor.moveToNext());
        }
        return recordDataList.get(0);
    }
}
